<template>
    <div>
        <a-divider orientation="left">
            Comandes en cours
        </a-divider>
        <a-table 
            :columns="columns" 
            :data-source="orders"
            :row-key="(order) => order.id" 
            bordered>
            <template slot="number" slot-scope="text">
                <a>{{ text }}</a>
            </template>

            <template slot="amount" slot-scope="text">
                <a>{{ text }} €</a>
            </template>

            <template slot="created_at" slot-scope="created_at">
                <a>{{ formatDate(created_at) }}</a>
            </template>

            <template slot="processed_at" slot-scope="processed_at, order">
                <a-tag v-if="order.processed_at" color="#87d068">
                    TRAITÉ !
                </a-tag>
                <a-tag v-else color="#f50">
                    EN ATTENTE
                </a-tag>
            </template>
            <template slot="title">
                <a-button type="primary" @click="show">Traiter les Commandes</a-button>
            </template>
        </a-table>
    </div>
</template>

<script>

import Modal from '../modals/command.vue'
import moment from "moment";

const columns = [
  {
    title: 'Numéro',
    dataIndex: 'number',
    scopedSlots: { customRender: 'number' },
  },
  {
    title: 'Montant',
    dataIndex: 'amount',
    scopedSlots: { customRender: 'amount' },
  },
  {
    title: 'Date de la commande',
    dataIndex: 'created_at',
    scopedSlots: { customRender: 'created_at' },
  },
  {
    title: 'Status',
    dataIndex: 'processed_at',
    scopedSlots: { customRender: 'processed_at' },
  },
];


export default {
    name: 'Command',
    data(){
        return{
            command: null,
            orders: [],
            columns,
        }
    },
    methods: {
        reloadData() {
            this.$axios.post('/orders/', {'uuid': localStorage.getItem('business_uuid')})
            .then(response => {
                console.log(response.data.orders)
                this.orders = response.data.orders
            })
            .catch( error => {
                console.log(error)
            })
        },
        show () {
            this.$modal.show(
                Modal,
                { orders: this.orders },
                {
                    width: 900,
                    height: 600
                },
                // eslint-disable-next-line no-unused-vars
                { 'before-close': event => { this.reloadData() } },
                { draggable: true },
            )
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
    
}
</script>