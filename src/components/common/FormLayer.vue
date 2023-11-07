<template>
  <div class="background-mask" v-if="show"></div>
  <div class="layer form-layer" v-if="show">
    <div class="layer-title">
      {{formInfo.label}}
    </div>
    <div class="normal-form">
      <normal-form :fields="formInfo.fields" :verify="formInfo.verify" :verify-type="formInfo.verifyType" />
    </div>
    <div class="btn-group btn-middle" v-if="btns.length">
      <div v-for="(btn) in btns" v-bind:key="btn.type" :class="btn.cls" v-text="btn.label" @click="btn.click"></div>
    </div>
  </div>
</template>

<script>
import NormalForm from "@/components/common/NormalForm.vue";

export default {
  name: "FormLayer",
  components: {NormalForm},
  props: {
    show: {
      type: Boolean,
      default: () => false
    },
    formInfo: {
      type: Object,
      default: () => {}
    },
    btns: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>