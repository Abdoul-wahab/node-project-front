<template>
    <div>
        <a-divider orientation="left">
            Mes Informations
        </a-divider>
    </div>
</template>

<script>
export default {
    name: 'Dash',
    data(){
        return{
            value: 'test',
            size: 300
        }
    },
    mounted() {
        console.log('Dash mounted.')
    }
    
}
</script>