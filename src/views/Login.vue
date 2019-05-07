<template>
  <div class="login">
    <!-- logo -->
    <div class="logo">
      <img src="../assets/logo.jpg" alt="logo">
    </div>
    <!-- 账号输入框 -->
    <InputGroup
      type="number"
      placeholder="手机号"
      v-model="phone"
      :btnTitle="btnTitle"
      :disabled=" is_disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode"
    />
    <!-- 验证码输入框 -->
    <InputGroup type="number" placeholder="验证码" v-model="verifyCode" :error="errors.code"/>
    <!-- 用户服务协议 -->
    <p class="tip">
      新用户登录即自动注册表示已同意
      <a href="#">《用户服务协议》</a>
    </p>
    <!-- 登录按钮 -->
    <input
      type="submit"
      value="登录"
      class="loginBtn"
      :disabled="btnDisabled"
      @click="toLogin"
      :class="{toLoginClass:!btnDisabled}"
    >
  </div>
</template>
<script>
import InputGroup from "../components/InputGroup.vue";
export default {
  data() {
    return {
      phone: "",
      verifyCode: "",
      errors: {
        phone: "",
        code: ""
      },
      btnTitle: "获取验证码",
      falg: true
    };
  },
  computed: {
    // 获取验证码按钮是否可点击
    is_disabled() {
      if (this.phone && this.falg) {
        return false;
      } else {
        return true;
      }
    },
    // 登录按钮是否可点击,并动态改变样式
    btnDisabled() {
      if (this.phone && this.verifyCode) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    //   获取验证码
    getVerifyCode() {
      //   验证手机号是否有效
      this.checkPhoneNumber();
      if (this.checkPhoneNumber()) {
        this.falg = false;
        // 倒计时
        this.countDown();
        // 手机号合法，发起网络请求
        this.axios
          .post("/api/posts/sms_send", {
            tpl_id: "154132",
            key: "fa397665b6a45e0bd95c36bee4d6bd79",
            phone: this.phone
          })
          .then(res => {
            // 发送成功，打印信息
            console.log(res);
          })
          .catch(err => {
            // 发送失败，抛出错误
            throw err;
          });
      }
    },
    // 点击按钮后开始倒计时
    countDown() {
      var time = 30;
      var timer = null;
      timer = setInterval(() => {
        this.btnTitle = `剩${time}秒`;
        time--;
        if (time < 0) {
          this.btnTitle = "重新获取";
          this.falg = true;
          clearInterval(timer);
        }
      }, 1000);
    },
    // 点击按钮后验证手机号是否合法
    checkPhoneNumber() {
      var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (TEL_REGEXP.test(this.phone)) {
        this.errors = {};
        return true;
      } else {
        this.errors.phone = "请输入有效的手机号码";
      }
    },
    toLogin() {
      if (this.checkPhoneNumber()) {
        this.axios
        // 登录接口
          .post("/api/posts/sms_back", {
            phone: this.phone,
            code: this.verifyCode
          })
          .then(res => {
            // 验证成功，存储状态，并进行页面跳转
            localStorage.setItem("is_login", true);
            this.$router.push("/");
          })
          .catch(err => {
            // 验证失败，返回错误信息
            this.errors.code = err.response.data.msg;
          });
      }
    }
  },
  components: {
    InputGroup
  }
};
</script>


<style scoped>
/* 登录页面 */
.login {
  background: #fff;
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
}
/* logo */
.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
/* 用户协议 */
.tip {
  line-height: 16px;
  margin-top: 20px;
  font-size: 14px;
  color: #aaa;
}
.tip a {
  color: #4d90fe;
}
/* 登录按钮 */
.loginBtn {
  margin-top: 40px;
  width: 100%;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #8bda81;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 4px;
}
.toLoginClass {
  background: #48ca38;
}
</style>

