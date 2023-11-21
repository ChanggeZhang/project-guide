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
      <div class="form-item btn-group">
        <div class="btn btn-middle btn-primary" @click="login" v-if="formType == 'login'">登录</div>
        <div class="btn btn-middle btn-text" @click="metamask" v-if="formType == 'login'">MetaMask登录</div>
        <div class="btn btn-middle form-forget btn-text" @click="forgetPwd" v-if="formType == 'login'">忘记密码</div>
        <div class="btn btn-middle btn-primary" @click="confirm" v-if="formType !== 'login'">确认</div>
      </div>
    </form>
  </div>
</template>
<script>
  import FormLogin from "@/components/common/FormLogin.vue";
  import Web3 from "web3";

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
        web3: null,
        formType: 'login',
        formInfo: {},
        formLabel: ''
      }
    },
    created() {
      this.switchForm('login')
    },
    methods: {
      login(model){
        this.$emit('login',model)
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
      },
      async metamask(){
        if (!window.ethereum) {
          this.$layer.error("请先安装MetaMask")
          return
        }
        if (!window.web3) {
          try {
            await window.ethereum.enable()
          } catch (e) {
            if (e.code !== -32002) {
              this.$layer.error("需要先允许MetaMask运行")
              return
            }
          }
          window.web3 = new Web3(window.ethereum)
        }else{
          window.web3 = new Web3(Web3.givenProvider)
        }
        this.web3 = window.web3
        const that = this;
        this.web3.eth.getAccounts().then((accounts) => {
          if(!accounts || !accounts.length){
            that.$layer.warn("当前账户没有钱包账户，记得创建钱包")
          }
          const publicAddress = accounts.map(c => c.toLowerCase())
          // 同步信息给后台
          that.login({
            publicAddress
          })
        })
      }
    }
  }
</script>