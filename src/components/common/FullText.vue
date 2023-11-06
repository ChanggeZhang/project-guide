<template>
  <div class="full-text">
    <div class="btn-group btn-small">
      <div class="btn btn-tab" @click="shiftFullScreen">
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
      if(!this.alreadyFull()) {
        if (this.requestFullscreen(dom, prefix)) {
          this.fulledScreen = true
        }
      }else{
        if (this.exitRequestFullscreen(dom, prefix)) {
          this.fulledScreen = false
        }
      }
      this.editable = this.fulledScreen && !this.readonly
    },
    requestFullscreen(dom,prefix){
      try {
        if (prefix == 'moz') {
          dom.mozRequestFullscreen()
        } else if (prefix == 'ms') {
          dom.msRequestFullscreen()
        } else if (prefix == 'webkit') {
          dom.webkitRequestFullscreen()
        } else {
          dom.requestFullscreen()
        }
        return true;
      } catch (e) {
        return false;
      }
    },
    exitRequestFullscreen(dom,prefix){
      try {
        if (prefix == 'moz') {
          document.mozExitFullscreen()
        } else if (prefix == 'ms') {
          document.msExitFullscreen()
        } else if (prefix == 'webkit') {
          document.webkitExitFullscreen()
        } else {
          document.exitFullscreen()
        }
        return true;
      } catch (e) {
        return false;
      }
    },
    alreadyFull(){
        return (
            document.mozFullscreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement ||
            document.fullscreenElement
        )
    },
    fullscreenChange(){
      this.fulledScreen = this.alreadyFull()
      this.editable = this.fulledScreen && !this.readonly
    },
    listenFullChange(){
      let that = this
      document.onfullscreenchange = () => {
        that.fullscreenChange()
      }
      document.onmozfullscreenchange = () => {
        that.fullscreenChange()
      }
      document.onwebkitfullscreenchange = () => {
        that.fullscreenChange()
      }
      document.onMSFullscreenChange = () => {
        that.fullscreenChange()
      }
    }
  }
}
</script>

<style scoped>

</style>