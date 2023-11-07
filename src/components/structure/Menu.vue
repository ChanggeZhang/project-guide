<template>
    <div class="menu">
        <div v-for="(menu) in menus" v-bind:key="menu.id"
             :id="menu.id"
             :class="['menu-item', `pid-${menu.pid || 0}`, `${!menu.pid || menu.show ? '' : 'hidden'}`, `${menu.active ? 'active' : ''}`]"
             @click="showChildren(menu)">
          <div class="menu-icon" v-if="menu.icon"><font-awesome-icon :icon="`fa-solid fa-${menu.icon}`" /></div>
          <span class="menu-text" :style="`padding-left: calc(${menu.level}*1rem)`">{{menu.name}}</span>
        </div>
    </div>
  <div class="main-content">
    <div class="empty" v-if="form.empty">
      <div class="empty-title-group">
        欢迎登陆<br/>
        <span class="empty-title">{{projectName}}</span>
      </div>
      <main-page></main-page>
    </div>
    <div class="main-body" v-if="!form?.empty">
      <search-com :fields="form.search" v-if="form.search && form.search.length" />
      <div class="btn-row btn-group btn-middle" v-if="form.canAdd">
        <div class="btn btn-primary" @click="showAdd">新增</div>
      </div>
      <list-table :info="formList" @click="click"></list-table>
      <edit-form :show="showEditForm" :label="curMenu.name" :info="editForm" :op-type="opType" :btn-label="btnLabel" :title="title" :suffix="suffix" @close="hideEditForm" />
    </div>
  </div>
</template>
<script>

  import {toggleMenu} from "@/js/menu";
  import SearchCom from "@/components/common/SearchCom.vue";
  import ListTable from "@/components/common/ListTable.vue";
  import EditForm from "@/components/common/EditForm.vue";
  import {OpType, Tip} from "@/js/enums";
  import MainPage from "@/components/structure/MainPage.vue";

  export default {
    name: "ContextMenu",
    components:{
      MainPage,
      EditForm,
      SearchCom,
      ListTable
    },
    props:{
      menus:{
        type: Array,
        default: () => []
      },
      projectName: {
        type:String,
        default: () => ''
      }
    },
    data(){
      return {
        form: {
          empty: true
        },
        showEditForm: false,
        formList: {},
        editForm: [],
        opType: 'detail',
        curMenu: {},
        title: "",
        suffix: "",
        btnLabel: []
      }
    },
    methods: {
      showChildren(menu){
        toggleMenu(this,menu)
        if(menu.name === '首页'){
          this.form = {
            empty: true
          }
          return;
        }
        if(!menu.hasChildren){
          this.curMenu = menu
          this.form = menu.formInfo
          this.formList = this.form.list
        }
      },
      showAdd(){
        this.editForm = this.formList.fields
        this.opType = 'entry'
        this.showEditForm = true
      },
      click(btn){
        if(!btn || !btn.id || !OpType[btn.id]){
          return;
        }
        let opType = btn.id
        if(OpType[opType] === OpType.del){
          this.$layer.layer({
            title: "提示",
            type: Tip.ERROR,
            message: `确定要${OpType[opType].label + this.curMenu.shortName}吗？`
          })
        }else if(OpType[opType] === OpType.other) {
          if(btn.formInfo['list']){
            this.formList = btn.formInfo.list
          }else if(btn.formInfo['form']){
            this.editForm = btn.formInfo.form.fields
            this.btnLabel = btn.formInfo.form.btnLabel
          }
          this.title = btn.label
          this.opType = opType
          this.showEditForm = true
        }else if(OpType[opType] || this.showEditForm){
          this.editForm = this.form.list.fields
          this.btnLabel = btn.btnLabel
          this.suffix = btn.suffix
          this.opType = opType
          this.showEditForm = true
        }else{
          this.showEditForm = false
        }
      },
      hideEditForm(){
        this.showEditForm = false
      }
    }
  }
</script>
<style scoped>
  .hidden{
    display: none!important;
  }
</style>