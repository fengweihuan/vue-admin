<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title"></h3>
      <div class="form_wrap">
        <p class="tips">用户登录</p>
        <el-form-item prop="username">
          <span class="iconfont icon-geren"></span>
          <el-input v-model="loginForm.username" size="small" name="username" type="text" auto-complete="on" placeholder="username" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="iconfont icon-mima"></span>
          <el-input
            :type="passwordType"
            v-model="loginForm.password"
            name="password"
             size="small"
            auto-complete="on"
            placeholder="password"
            @keyup.enter.native="handleLogin" />
          <span @click="showPwd" class="iconfont eye" :class="passwordType === 'password' ? 'icon-chakanmima1' : 'icon-chakanmima'"></span>
        </el-form-item>
        <el-form-item>
          <el-button class="login_button" :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </div>
      <!-- <div class="tips" style="margin-top:10px;text-align:center;cursor: pointer;" @click="backHistory">
        <span style="color:#ddd">返回旧版本</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '超级管理员',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.replace({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .iconfont{
    color: #ffffff;
    font-size: 24px;
    margin-left: 15px;
    &.eye{
      cursor: pointer;
      position: absolute;
      font-size: 18px;
      right: 10px;
    }
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 80%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$boderColor: #006ee9;
$contentColor: #242f34;
$fontColor: #7ab9ff;
$activeColor: #1d2088;
.login-container {
  background: url('./images/login_bg.jpg') no-repeat 50% 50%;
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 0 auto;
    left: 120px;
    top: 50%;
    transform: translateY(-50%);
    &.mobile {
      left: auto;
      padding: 0px;
      .title{
        width: auto;
      }
      .form_wrap{
        margin: 0 20px;
        padding:  10px;
      }
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    width: 400px;
    height: 130px;
    background: url('./images/login_title.png') no-repeat 50% 50%;
    background-size: contain;
    text-align: center;
    margin: 0 auto 20px;
  }
  .form_wrap{
    border: 1px solid $activeColor;
    padding: 30px 40px;
    background: rgba(4, 30, 77, 0.8);
    .tips {
      text-align: center;
      font-size: 22px;
      margin-bottom: 30px;
      color: $fontColor;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .login_button{
    background-color: $boderColor;
    border-color: $boderColor; 
  }
}
</style>
