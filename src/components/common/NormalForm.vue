<template>
  <div :class="['form-item',,`${['image','fulltext','table'].some(t => t === field.type) ? 'full-row' : ''}`]" v-for="(field) in fields" v-bind:key="field.id">
    <div class="form-label">{{ field.name }}：</div>
    <div :class="['form-item-box']">
      <field-com :field="field" :readonly="readonly"/>
    </div>
  </div>
  <div class="form-item verify" v-if="verify && verifyType == 'img'">
    <input type="text" class="form-input form-verify" :required="verify" />
    <div class="verify-img"></div>
  </div>
  <div class="form-item verify btn-auto" v-else-if="verify && verifyType == 'sms'">
    <input type="text" class="form-input form-verify" :required="verify" />
    <div class="btn btn-primary">发送验证码</div>
  </div>
</template>

<script>
import FieldCom from "@/components/common/FieldCom.vue";

export default {
  name: "NormalForm",
  components: {FieldCom},
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    verify: {
      type: Boolean,
      default: () => false
    },
    readonly:{
      type: Boolean,
      default: () => false
    },
    verifyType:{
      type: String,
      default: () => "img"
    }
  }
}
</script>

<style scoped>

</style>