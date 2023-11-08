<template>
    <div class="form-item" v-for="(field) in fields" v-bind:key="field.id">
      <div class="icon" v-if="field.icon"><font-awesome-icon :icon="['fa-solid',`fa-${field.icon}`]" /></div>
      <input :type="field.type || 'text'" class="form-input" :placeholder="field.placeholder" :multiple="field.multiple" :required="field.required" />
    </div>
    <div class="form-item verify" v-if="verify && verifyType == 'img'">
      <input type="text" class="form-input form-verify" :required="verify" />
      <div class="verify-img"></div>
    </div>
    <div class="form-item verify" v-else-if="verify && verifyType == 'sms'">
      <input type="text" class="form-input form-verify" :required="verify" />
      <div class="btn btn-auto btn-primary">发送验证码</div>
    </div>
</template>

<script>
export default {
  name: "FormLogin",
  props:{
    fields: {
      type: Array,
      default: () => []
    },
    verify: {
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