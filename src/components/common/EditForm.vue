<template>
  <div class="background-mask" v-if="show"></div>
  <div :class="[`edit-form`,opType]" v-if="show">
    <div class="form-title">
      <h1>{{title || label + "-" + opLabel}}</h1>
    </div>
    <form action="#" class="form-body">
      <normal-form :fields="info" :verify="false" :readonly="readonly" />
    </form>
    <div class="btn-group btn-middle">
      <div class="btn-primary" @click="close">{{(btnLabel && btnLabel[0]) || "确认"}}</div>
      <div class="btn-default" @click="close">{{(btnLabel && btnLabel[1]) || "取消"}}</div>
    </div>
  </div>
</template>

<script>
import {OpType} from "@/js/enums";
import NormalForm from "@/components/common/NormalForm.vue";

export default {
  name: "EditForm",
  components: {NormalForm},
  props: {
    show: {
      type: Boolean,
      default: () => false
    },
    label:{
      type: String,
      default: () => ''
    },
    info: {
      type: Array,
      default: () => []
    },
    opType: {
      type: String,
      default: () => ""
    },
    title: {
      type: String,
      default: ""
    },
    btnLabel: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    opType(newV){
      if(typeof newV === 'string'){
        let op = OpType[newV]
        this.opLabel = op ? op.label : this.opLabel;
        this.readonly = op ? op.readonly : this.readonly;
      }
    }
  },
  data(){
    return {
      opLabel: '',
      readonly: false
    }
  },
  methods:{
    close(e){
      if(e.currentTarget && e.currentTarget.classList.contains('btn-primary')){
        // this.$layer.layer({
        //   title:"工程造价估算-结果",
        //   message: "经过计算得出，预估总成本在270万左右",
        //   btns: [{
        //     label: "确认",
        //     type: "button",
        //     cls: "primary",
        //     id: "ok",
        //     click: () => {
              this.$emit('close')
        //       this.$layer.close()
        //     }
        //   },{
        //     label: "取消",
        //     type: "button",
        //     cls: "default",
        //     id: "cancel",
        //     click: () => {
        //       this.$layer.close()
        //     }
        //   }]
        // })
      }else{
        this.$emit('close')
      }
    }
  }
}
</script>

<style scoped>

</style>