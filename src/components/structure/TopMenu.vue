<template>
  <div class="top-context">
    <img class="project-icon-head" :src="projectInfo?.icon">
    <div class="project-name">
      {{projectInfo?.name}}
    </div>
    <div class="right">
      <img class="avatar" :src="projectInfo?.avatar" />
      <div class="btn-exit" @click="quit"><font-awesome-icon :icon="`fa-solid fa-power-off`" />退出登录</div>
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
  <form-layer :show="showForm"
              :form-info="form"
              :btns="formBtns" />
</template>

<script>
  import {toggleMenu} from "@/js/menu";
  import {Tip} from "@/js/enums";
  import FormLayer from "@/components/common/FormLayer.vue";

  export default {
    name: "TopMenu",
    components: {FormLayer },
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
          tip: Tip.WARN,
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
      }
    }
  }
</script>
<style scoped>

</style>