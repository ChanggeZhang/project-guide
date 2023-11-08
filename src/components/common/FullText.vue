<template>
  <div class="full-text">
    <div class="btn-group">
      <div class="btn btn-small btn-tab" @click="shiftFullScreen">
        <font-awesome-icon :icon="`fa-solid fa-${this.fulledScreen ? 'compress' : 'expand'}`" />
        {{this.fulledScreen ? '取消全屏' : '全屏'}}
      </div>
    </div>
    <div :class="['text-content',`${editable ? 'div-editable' : ''}`]" v-html="value" :contenteditable="editable" ref="text-content">
    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import shitFullScreen from "@/js/menu/shitFullScreen";

export default {
  name: "FullText",
  components: {FontAwesomeIcon},
  props:{
    readonly:{
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: () => ''
    }
  },
  data(){
    return {
      fulledScreen: false,
      editable: false
    }
  },
  created() {
    this.listenFullChange()
  },
  methods:{
    shiftFullScreen(){
      let prefix = this.$webPrefix
      const dom = this.$refs["text-content"]
      if(!shitFullScreen.alreadyFull()) {
        if (shitFullScreen.requestFullscreen(dom, prefix)) {
          this.fulledScreen = true
        }
      }else{
        if (shitFullScreen.exitRequestFullscreen(prefix)) {
          this.fulledScreen = false
        }
      }
      this.editable = this.fulledScreen && !this.readonly
    },
    fullscreenChange(){
      this.fulledScreen = shitFullScreen.alreadyFull()
      this.editable = this.fulledScreen && !this.readonly
    },
    listenFullChange(){
      shitFullScreen.listenFullChange(this.fullscreenChange)
    }
  }
}
</script>

<style scoped>

</style>