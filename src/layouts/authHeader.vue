<template>
<div class="auth">
  <a-layout style="height: 100vh;">
    <a-row type="flex">
      <a-col :span="8" :offset="8" style="margin-top: 80px;">
        <router-view></router-view>
      </a-col>
    </a-row>
  </a-layout>
</div>
</template>

<script>
import 'ant-design-vue/dist/antd.css'
export default {
  name: "authHeader",
  mounted(){
    //this.$router.push('login')  
    console.log('login header')   
  }
};
</script>