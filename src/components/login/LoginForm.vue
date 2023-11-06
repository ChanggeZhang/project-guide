<template>
  <div class="login-container">
    <h1 class="cover">{{projectName}}</h1>
    <form action="#" class="login-form">
      <div class="tab">
        <div class="tab-item active">{{formLabel}}</div>
      </div>
      <form-login :fields="formInfo.fields"
                  :verify="formInfo.verify"
                  :verify-type="formInfo.verifyType"
                  @forgetPwd="forgetPwd"
                  @login="login"
                  @confirm="confirm"
                  @cancel="cancel"
      />
      <div class="form-item btn-group btn-middle">
        <div class="btn-primary" @click="login" v-if="formType == 'login'">登录</div>
        <div class="form-forget btn-text" @click="forgetPwd" v-if="formType == 'login'">忘记密码</div>
        <div class="btn-primary" @click="confirm" v-if="formType !== 'login'">确认</div>
      </div>
    </form>
  </div>
</template>
<script>
  import FormLogin from "@/components/common/FormLogin.vue";

  export default {
    name: 'LoginForm',
    components: {FormLogin},
    props: {
      projectName: {
        type: String,
        default: ''
      },
      formValue: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        formType: 'login',
        formInfo: {},
        formLabel: ''
      }
    },
    created() {
      this.switchForm('login')
    },
    methods: {
      login(){
        this.$emit('login')
      },
      forgetPwd(){
        this.switchForm('forget');
      },
      confirm(){
        this.switchForm('login')
      },
      cancel(){
        this.switchForm('login')
      },
      switchForm(type){
        if(this.formValue){
          this.formType = type
          this.formInfo = this.formValue[type]
          this.formLabel = this.formInfo.label
        }
      }
    }
  }
</script>