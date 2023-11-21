<template>
  <login-form v-if="!hasLogin" :projectName="projectInfo.name" :formValue="projectInfo.formValue" @login="login"></login-form>
  <div class="container" v-if="hasLogin">
    <top-menu :project-info="projectInfo" :menus="menus.top" @exit="exit"></top-menu>
    <context-menu :menus="menus.left" :project-name="projectInfo.name"></context-menu>
  </div>
</template>

<script>
import ContextMenu from "@/components/structure/Menu.vue";
import TopMenu from "@/components/structure/TopMenu.vue";
import {getMenus, getProjectInfo} from "@/js/menu";
import LoginForm from "@/components/login/LoginForm.vue";

export default {
  name: 'App',
  components: {
    LoginForm,
    ContextMenu,
    TopMenu
  },
  data(){
    return {
      hasLogin: false,
      projectInfo: {},
      menus: []
    }
  },
  created() {
    this.hasLogin = !!localStorage.getItem("hasLogin")
    this.loadMenus();
    this.loadProjectInfo();
  },
  methods: {
    loadMenus(){
      let menus = getMenus();
      this.menus = menus;
    },
    loadProjectInfo(){
      let projectInfo = getProjectInfo()
      this.projectInfo = projectInfo;
    },
    exit(){
      this.hasLogin = false;
      localStorage.removeItem("hasLogin")
      localStorage.removeItem("login.user")
      if (window.web3 && window.web3.currentProvider && window.web3.currentProvider.disconnect && typeof window.web3.currentProvider.disconnect == 'function') {
        window.web3.currentProvider.disconnect()
      }
      delete window.web3
    },
    login(){
      this.hasLogin = true
      localStorage.setItem("hasLogin",this.hasLogin)
    }
  }
}
</script>

<style>

</style>