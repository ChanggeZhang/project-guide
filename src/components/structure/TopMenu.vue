<template>
  <div class="top-context">
    <img class="project-icon-head" :src="projectInfo?.icon">
    <div class="project-name">
      {{projectInfo?.name}}
    </div>
    <div class="right">
      <img class="avatar" :src="projectInfo?.avatar" @click="personalCenter" />
      <div class="btn-exit" @click="quit"><font-awesome-icon :icon="`fa-solid fa-power-off`" />退出登录</div>
      <div class="btn-exit" @click="switchTheme"><font-awesome-icon :icon="`fa-solid fa-cookie-bite`" />主题</div>
      <span  class="more" @click="showMore"><font-awesome-icon icon="fa-solid fa-caret-down" /></span>
    </div>
    <div class="top-menu-container" v-if="showTopMenu" @mouseleave="hideMore">
      <div v-for="(menu) in menus" v-bind:key="menu.id"
           :id="menu.id"
           :class="['menu-item', `pid-${menu.pid || 0}`, `${!menu.pid || menu.show ? '' : 'hidden'}`]"
           @click="showChildren(this,menu)">
        <div class="menu-icon" v-if="menu.icon"><font-awesome-icon :icon="`fa-solid fa-${menu.icon}`" /></div>
        <span class="menu-text" :style="`padding-left: calc(${menu.level}*1rem)`">{{menu.name}}</span>
      </div>
    </div>
  </div>
  <form-layer v-if="showForm" :show="showForm"
              :form-info="form"
              :btns="formBtns" />
  <theme-setting :show="showTheme" @close="closetheme"></theme-setting>
</template>

<script>
  import {toggleMenu} from "@/js/menu";
  import {Tip} from "@/js/enums";
  import FormLayer from "@/components/common/FormLayer.vue";
  import ThemeSetting from "@/components/common/ThemeSetting.vue";
  import Layer from "@/js/plugins/Layer";
  import {Web3Proxy} from "@/js/utils/Store";
  import Web3 from "web3";

  export default {
    name: "TopMenu",
    components: {ThemeSetting, FormLayer },
    props:{
      projectInfo: {
        type: Object,
        default: () => {}
      },
      avatar: {
        type: String,
        default: () => ''
      },
      menus:{
        type: Array,
        default: () => []
      }
    },
    data(){
      return {
        showTheme: false,
        showTopMenu: false,
        showQuit: false,
        showForm: false,
        quitInfo: {},
        form: {},
        formBtns: [{
          type: 'yes',
          label: '确认',
          cls: ['btn-primary'],
          click: () => {
            this.showForm = false
          }
        }, {
          type: 'no',
          label: '取消',
          cls: ['btn-default'],
          click: () => this.showForm = false
        }]
      }
    },
    methods: {
      switchTheme(){
        this.showTheme = true
      },
      closetheme(){
        this.showTheme = false
      },
      showChildren(that,menu){
        toggleMenu(this,menu);
        if(!menu.hasChildren){
          this.layerForm(menu)
        }
      },
      showMore(){
        this.showTopMenu = true
      },
      hideMore(){
        this.showTopMenu = false;
      },
      quit(){
        this.$layer.layer({
          type: Tip.WARN,
          title: '确认退出',
          message: '确定要退出系统吗？',
          btns: [{
            type: 'yes',
            label: '确认',
            cls: ['btn-primary'],
            click: () => {
              this.$emit('exit')
              this.$layer.close()
            }
          }, {
            type: 'no',
            label: '取消',
            cls: ['btn-default'],
            click: () => this.$layer.close()
          }]
        })
      },
      layerForm(menu){
        this.showForm = true
        menu.formInfo.label = menu.name
        this.form = menu.formInfo
      },
      async personalCenter(){
        let info = await this.renderPersonalInfo()
        let that = this;
        this.$layer.layer({
          tip: Tip.INFO,
          title: "个人中心",
          message: info,
          delayClose: false,
          btns: [{
            label: "确认",
            type: "button",
            cls: ["btn-primary"],
            id: "ok",
            click: () => {
              Layer.close()
            }
          },{
            label: "同步",
            type: "button",
            cls: ["btn-primary"],
            id: "sync",
            click: async () => {
              await Web3Proxy.getWeb3Accounts(that)
              info = await that.renderPersonalInfo()
              if (that.$layer.__data.vNode) {
                that.$layer.__data.vNode.type.props.message = info
              }
            }
          },{
            label: "取消",
            type: "button",
            cls: ["btn-default"],
            id: "cancel",
            click: () => {
              Layer.close()
            }
          }]
        })
      },
      async renderPersonalInfo(){
        let str = localStorage.getItem("login.user");
        const publicAddress = JSON.parse(str)['publicAddress']
        if(!publicAddress || !publicAddress.length) return
        let amounts = ''
        for (let publicAddressKey in publicAddress) {
          const w3 = new Web3(window.web3.currentProvider)
          const balance = await w3.eth.getBalance(publicAddress[publicAddressKey])
          amounts += `
                    <tr>
                      <td>${publicAddress[publicAddressKey]}</td>
                      <td>${balance}</td>
                    </tr>`
        }
        return `<table>
                <thead>
                    <tr>
                        <th>账户</th><th>余额</th>
                    </tr>
                </thead>
                <tbody>
                    ${amounts}
                </tbody>
            </table>`;
      }
    }
  }
</script>
<style scoped>

</style>