<template>
  <div class="login-container">
    <video ref="videoRef" muted width="100vw" loop class="back" src="@/assets/back.mp4" />
    <el-card class="login-card">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">
            <img src="@/assets/image/logo.png" alt="" />
          </h3>
        </div>

        <el-form-item prop="account">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="username" v-model="loginForm.account" placeholder="用户名" type="text" tabindex="1" auto-complete="on" />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on"
            @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="password">
          <div class="validate_code">
            <span class="svg-container">
              <i class="el-icon-success" />
            </span>
            <el-input v-model="loginForm.code" @keyup.enter.native="handleLogin" />
            <img slot="append" style="width: 100px" :src="codeImgUrl" alt="" @click="debounceCode" />
          </div>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width: 100%; height: 50px; margin-bottom: 30px" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/user";
import _ from "lodash";
export default {
  name: "Login",
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "shenlingadmin",
        password: "123456",
        code: null,
        key: null,
      },
      loginRules: {
        account: [{ required: true, trigger: "blur" }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      codeImgUrl: null,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created () {
    this.getCodeImg();
  },
  mounted () {
    setTimeout(() => {
      this.$refs.videoRef.play();
    }, 1000);
    // this.$refs.videoRef.onloadeddata = () => {
    //   this.$refs.videoRef.play()
    // }
  },
  methods: {
    async getCodeImg () {
      this.loginForm.key = ~~(Math.random() * 10000000000); // key作为验证码的标识
      const result = await getCodeImg({ key: this.loginForm.key });
      // blob转base64
      const reader = new FileReader();
      reader.readAsDataURL(result);
      reader.onload = (e) => {
        this.codeImgUrl = e.target.result;
      };
    },
    debounceCode () {
      _.debounce(this.getCodeImg, 500)();
    },
    showPwd () {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true;
            await this.$store.dispatch("user/login", this.loginForm);
            this.$router.push("/");
          } catch (err) {
            console.log(err);
            this.getCodeImg();
          } finally {
            this.loading = false;
          }
        } else {
          console.log("错误的提交");
          this.getCodeImg();
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

/* reset element-ui css */
.login-container {
  .back {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    object-fit: fill;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
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

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-card {
    z-index: 2;
  }
  .login-form {
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 10px 20px;
    margin: 0 auto;
    overflow: hidden;
  }
  .validate_code {
    position: relative;
    img {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      text-align: center;
      img {
        height: 54px;
        width: 200px;
      }
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
}
</style>
