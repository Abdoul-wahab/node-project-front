<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo">
        Portfolio Dashboard
      </div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <router-link to="/dashboard">
            <a-icon type="dashboard" />
            <span class="nav-text">Dashboard</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="2">
          <router-link to="/commandes" class="nav-text">
            <a-icon type="unordered-list" />
            <span class="nav-text">Experiences</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="3">
          <router-link to="/projects" class="nav-text">
            <a-icon type="folder-open" />
            <span class="nav-text">Projects</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="4">
          <router-link to="/infos" class="nav-text">
            <a-icon type="user" />
            <span class="nav-text">Mes informations</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="5" @click="logout">
            <a-icon type="logout" />
            <span class="nav-text">
              Déconnexion
            </span>
        </a-menu-item>

      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div>
          <router-view></router-view>
        </div>
      </a-layout-content>
      
    </a-layout>

  </a-layout>
</template>

<script>
import 'ant-design-vue/dist/antd.css'
export default {
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    logout () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
      })
    }
  },
};
</script>

<style>
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  color: aliceblue;
  text-align: center;
  font-size: 20px;
}

#components-layout-demo-custom-trigger {
  height: 100vh;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.admin-header .admin-header-wide .admin-header-right {
  float: right;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  color: inherit;
}

.admin-header .admin-header-wide .admin-header-right .header-item {
  color: inherit;
  padding: 0 12px;
  cursor: pointer;
  -ms-flex-item-align: center;
  align-self: center;
}
</style>