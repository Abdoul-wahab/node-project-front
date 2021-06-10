<template>
<div>
    <a-divider orientation="left">
        Produits
    </a-divider>
    <a-button class="editable-add-btn m-4" @click="showAddProductModal">
      Ajouter
    </a-button>


    <a-table 
      :columns="columns" 
      :row-key="record => record.id"
      :data-source="data" 
      bordered>
        <template
          v-for="col in ['name', 'price', 'description']"
          slot-scope="text, record"
          :slot="col"
        >
          <div :key="col">
              <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e.target.value, record.key, col)"
              />
              <template v-else>
                {{ text }}
              </template>
          </div>
        </template>

        <template slot="image_url" slot-scope="image_url">
          <a><img :src="image_url" class="product-img" :alt="image_url"></a>
        </template>
        
        <template slot="created_at" slot-scope="created_at">
          {{ formatDate(created_at) }}
        </template>

        <template slot="in_stock" slot-scope="text, record">
          <div class="editable-row-actions">
              <a-popconfirm :title="getInStockPopText(true)" @confirm="() => save(record.id)">
                  <a-tag :color="getInStockTagColor(true)">{{ getInStockBtnText(true) }}</a-tag>
              </a-popconfirm>
          </div>
        </template>

        <template slot="action" slot-scope="text, record">
          <div class="editable-row-actions">
              <span v-if="record.editable">
                <a-popconfirm title="Êtes-vous sûr?" @confirm="() => save(record.id)">
                    <a-tag color="blue">Enregister</a-tag>
                </a-popconfirm>
                <a @click="() => cancel(record.id)">
                    <a-tag color="red">Annuler</a-tag>
                </a>
              </span>
              <span v-else>
                <a :disabled="editingKey !== ''" @click="() => edit(record.id)">
                    <a-tag :color="getTagColor(editingKey !== '')">Modifier</a-tag>
                </a>
              </span>
          </div>
        </template>
  </a-table>

  
</div>
</template>
<script>
import Modal from '../modals/addproduct.vue'
import moment from "moment"

const columns = [
  {
    title: 'Image',
    dataIndex: 'image_url',
    scopedSlots: { customRender: 'image_url' },
  },
  {
    title: 'Nom',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Prix (€)',
    dataIndex: 'price',
    scopedSlots: { customRender: 'price' },
  },
  {
    title: 'Description',
    dataIndex: 'description',
    scopedSlots: { customRender: 'description' },
  },
  {
    title: 'Date de création',
    dataIndex: 'created_at',
    scopedSlots: { customRender: 'created_at' },
  },
  {
    title: 'En Stock ?',
    dataIndex: 'in_stock',
    scopedSlots: { customRender: 'in_stock' },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

export default {
  data() {
    //this.cacheData = data.map(item => ({ ...item }));
    return {
      data: [],
      columns,
      editingKey: '',
    };
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.id)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      //const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item.id)[0];
      //const targetCache = newCacheData.filter(item => key === item.id)[0];
      if (target ) {
        delete target.editable;
        this.data = newData;
        //Object.assign(targetCache, target);
        //this.cacheData = newCacheData;
      }
      this.editingKey = '';
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.id)[0];
      this.editingKey = '';
      if (target) {
        //Object.assign(target, this.cacheData.filter(item => key === item.id)[0]);
        delete target.editable;
        this.data = newData;
      }
    },
    showAddProductModal () {
        this.$modal.show(
            Modal,
            { draggable: true },
            {
                width: 600,
                height: 450
            },
            // eslint-disable-next-line no-unused-vars
            { 'before-close': event => { this.reloadData() } }
        )
    },
    reloadData(){
      this.$axios.get('/services')
      .then(response => {
          this.data = response.data.data
      })
      .catch( error => {
          console.log(error)
      })
    },
    getTagColor(isDisabled){
        if(isDisabled){
            return ''
        }
        return 'blue'
    },
    getInStockTagColor(check){
      if(check){
            return '#87d068'
        }
      return '#f50'
    },
    getInStockBtnText(check){
      if(check){
            return 'Disponible'
        }
      return 'Indisponible'
    },
    getInStockPopText(check){
      if(check){
            return 'Enlever ce produit du stock?'
        }
      return 'Rajouter ce produit en stock?'
    },
    formatDate(value) {
        if (value) {
            return moment(String(value)).format('DD-MM-YYYY à hh:mm')
        }
    },
  },
  created() {
    this.reloadData()
  }
};
</script>
<style scoped>
.editable-row-actions a {
  margin-right: 8px;
}

.product-img {
  width: 70px;
  border-radius: 10px;
  /* float: left; */
  border: 5px solid rgba(255, 255, 255, 0.2);
}
</style>