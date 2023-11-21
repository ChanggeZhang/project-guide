<template>
  <div class="background-mask" v-if="showLayer"></div>
  <div :class="['layer',type === Tip.LOADING ? 'loading-layer' : '']" :style="`${this.height ? ('height: ' + this.height + ';') : ''}${this.width ? ('width: ' + this.width + ';') : ''}`" v-if="showLayer">
    <div class="layer-title" v-if="showTitle">
        {{title}}
    </div>
    <div class="layer-body">
      <div :class="['layer-icon',type === Tip.LOADING ? 'loading' : '']">
        <font-awesome-icon :icon="['fa-solid', `fa-${type.icon}`]" :class="['tip',`tip-${type.id}`]"></font-awesome-icon>
      </div>
      <div :class="[type === Tip.LOADING ? 'loading-content' : 'content']" v-html="message"></div>
    </div>
    <div class="btn-group" v-if="btns.length">
      <div v-for="(btn) in btns" v-bind:key="btn.type" :class="['btn','btn-middle',...btn.cls]" v-text="btn.label" @click="btn.click"></div>
    </div>
  </div>
</template>
<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {Tip} from "@/js/enums";
import Layer from "@/js/plugins/Layer";

export default {
  name: "ConfirmLayer",
  computed: {
    Tip() {
      return Tip
    }
  },
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
    },
    width: {
      type: String,
      default: () => undefined
    },
    height: {
      type: String,
      default: () => undefined
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
      if(this.delayClose) {
        setTimeout(() => {
          Layer.close()
        },this.timeout)
      }
    }
  }
}
</script>
<style scoped>

</style>