<template>
  <div class="background-mask" v-if="showLayer"></div>
  <div class="layer" v-if="showLayer">
    <div class="layer-title" :showTitle="showTitle">
        {{title}}
    </div>
    <div class="layer-body">
      <div class="layer-icon">
        <font-awesome-icon :icon="['fa-solid', `fa-${type.icon}`]" :class="['tip',`tip-${type.id}`]"></font-awesome-icon>
      </div>
      <div class="content" v-html="message"></div>
    </div>
    <div class="btn-group" v-if="btns.length">
      <div v-for="(btn) in btns" v-bind:key="btn.type" :class="['btn','btn-middle',...btn.cls]" v-text="btn.label" @click="btn.click"></div>
    </div>
  </div>
</template>
<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {Tip} from "@/js/enums";

export default {
  name: "ConfirmLayer",
  components: {FontAwesomeIcon},
  props: {
    type: {
      type: Object,
      default: () => Tip.INFO
    },
    show: {
      type: Boolean,
      default: () => false
    },
    message: {
      type: String,
      default: () => ''
    },
    showTitle: {
      type: Boolean,
      default: () => true
    },
    title: {
      type: String,
      default: () => ''
    },
    btns: {
      type: Array,
      default: () => []
    },
    timeout: {
      type: Number,
      default: () => 2000
    },
    delayClose: {
      type: Boolean,
      default: () => true
    }
  },
  created() {
    this.showLayer = this.show
    this.autoClose()
  },
  watch: {
    show(newV){
      if(newV instanceof Boolean){
        this.showLayer = this.show
      }
    }
  },
  data() {
    return {
      showLayer: false
    }
  },
  methods: {
    close(){
      this.showLayer = false
    },
    autoClose(){
      if(!this.btns.length || this.delayClose) {
        setTimeout(() => {
          this.close()
        },this.timeout)
      }
    }
  }
}
</script>
<style scoped>

</style>