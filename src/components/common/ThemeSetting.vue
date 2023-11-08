<template>
  <div class="background-mask" v-if="show"></div>
  <div class="layer form-layer" v-if="show">
    <div class="layer-title">
      自定义主题
    </div>
    <div class="normal-form">
      <div :class="['form-item']">
        <div class="form-label">主题背景色：</div>
        <div :class="['form-item-box']">
          <input type="color" class="form-input" v-model="form.menuBackgroundColor"  />
        </div>
      </div>
      <div :class="['form-item']">
        <div class="form-label">主题文字颜色：</div>
        <div :class="['form-item-box']">
          <input type="color" class="form-input" v-model="form.menuItemColor"  />
        </div>
      </div>
      <div :class="['form-item']">
        <div class="form-label">顶部背景色：</div>
        <div :class="['form-item-box']">
          <input type="color" class="form-input" v-model="form.topMenuBackgroundColor"  />
        </div>
      </div>
      <div :class="['form-item']">
        <div class="form-label">顶部字体颜色：</div>
        <div :class="['form-item-box']">
          <input type="color" class="form-input" v-model="form.topMenuItemColor"  />
        </div>
      </div>
      <div :class="['form-item']">
        <div class="form-label">背景颜色：</div>
        <div :class="['form-item-box']">
          <input type="color" class="form-input" v-model="form.backgroundColor"  />
        </div>
      </div>
      <div :class="['form-item']">
        <div class="form-label">背景大图：</div>
        <div :class="['form-item-box']">
          <input type="text" class="form-input" v-model="form.bgImage"  />
        </div>
      </div>
    </div>
    <div class="btn-group">
      <div class="btn btn-middle btn-primary" @click="submit">设置</div>
      <div class="btn btn-middle btn-text" @click="close">取消</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ThemeSetting",
  props:{
    show: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      form: {
        menuBackgroundColor: null,
        topMenuBackgroundColor: null,
        menuItemColor: null,
        topMenuItemColor: null,
        bgImage: null,
        backgroundColor: null
      }
    }
  },
  created() {
    this.initialDefaultColor()
  },
  methods:{
    close(){
      this.$emit('close')
    },
    initialDefaultColor(){
      let style = getComputedStyle(document.documentElement)
      this.form.menuBackgroundColor = style.getPropertyValue('--menu-background-color')
      this.form.topMenuBackgroundColor = style.getPropertyValue('--top-menu-background-color')
      this.form.menuItemColor = style.getPropertyValue('--menu-item-color')
      this.form.topMenuItemColor = style.getPropertyValue('--top-menu-item-color')
      let bgImage = style.getPropertyValue('--bg-image')
      this.form.bgImage = bgImage.substring(5,bgImage.length - 2)
      this.form.backgroundColor = style.getPropertyValue('--background-color')
    },
    submit(){
      let style = document.documentElement.style
      style.setProperty('--menu-background-color',this.form.menuBackgroundColor)
      style.setProperty('--top-menu-background-color',this.form.topMenuBackgroundColor)
      style.setProperty('--menu-item-color',this.form.menuItemColor)
      style.setProperty('--top-menu-item-color',this.form.topMenuItemColor)
      let bgImage = `url("${this.form.bgImage}")`
      style.setProperty('--bg-image', bgImage)
      style.setProperty('--background-color',this.form.backgroundColor)
      this.close()
    }
  }
}
</script>

<style scoped>

</style>