<template>
    <div align="center" style="margin-top:50px;">
        <a-result status="warning" title="Vous n'avez pas enregistrer votre entreprise.">
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
// import QrcodeVue from 'qrcode.vue'
export default {
    name: 'Dash',
    data(){
        return{
            user: [],
        }
    },
    methods: {
        // getUserData(){
        //     this.$axios.post('/v1/auth/user')
        //     .then(response => {
        //         console.log(response)
        //         this.user = response.data.user
        //         this.business = response.data.business
        //         if(this.business.length > 0){
        //             this.qrcodeValue = this.business[0].uuid
        //             localStorage.setItem('business_uuid', this.qrcodeValue);
        //         }
        //     })
        //     .catch( error => {
        //         console.log(error)
        //     })
        // },
        show () {
            this.$modal.show(
                Modal,
                { draggable: true },
                {
                    width: 500,
                    height: 550
                },
                // eslint-disable-next-line no-unused-vars
                { 'before-close': event => { console.log('call function here') } }
            )
        },
    },
    // components: {
    //     'qrcode-vue': QrcodeVue,
    // },
    // created() {
    //     this.getUserData()
    // }

}
</script>