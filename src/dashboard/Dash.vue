<template>
    <div align="center" style="margin-top:50px;">
        <span v-if="qrcodeValue">
            <qrcode-vue :value="qrcodeValue" :size="size" level="H" />
        </span>
        <a-result v-else status="warning" title="Vous n'avez pas enregistrer votre entreprise.">
            <template #extra>
            <a-button key="console" type="primary" @click="show">
                Ajouter mon entreprise
            </a-button>
            </template>
        </a-result>
    </div>
</template>

<script>
import Modal from './Add.vue'
import QrcodeVue from 'qrcode.vue'
export default {
    name: 'Dash',
    data(){
        return{
            qrcodeValue: null,
            size: 300,
            user: [],
            business: [],
        }
    },
    methods: {
        getUserData(){
            this.$axios.post('/v1/auth/user')
            .then(response => {
                console.log(response)
                this.user = response.data.user
                this.business = response.data.business
                if(this.business.length > 0){
                    this.qrcodeValue = this.business[0].uuid
                    localStorage.setItem('business_uuid', this.qrcodeValue);
                }
            })
            .catch( error => {
                console.log(error)
            })
        },
        show () {
            this.$modal.show(
                Modal,
                { draggable: true },
                {
                    width: 600,
                    height: 350
                },
                // eslint-disable-next-line no-unused-vars
                { 'before-close': event => { this.getUserData() } }
            )
        },
    },
    components: {
        'qrcode-vue': QrcodeVue,
    },
    created() {
        this.getUserData()
    }

}
</script>