<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/elemeLogo.svg" alt="eleme logo" />
    </div>

    <the-input-group
      inputType="number"
      v-model="tel"
      inputPlaceholder="手机号"
      :errorMsg="telErrorMsg"
      :hasClearBtn="true"
      @clearBtnClick="clearTel"
    ></the-input-group>

    <the-input-group
      inputType="number"
      v-model="verificationCode"
      inputPlaceholder="验证码"
      :isDisabled="isDisabledPassed"
      :isAvailable="isAvailablePassed"
      :inputBtnText="inputBtnTextPassed"
      @inputBtnClick="sendCode"
      :errorMsg="codeErrorMsg"
    ></the-input-group>

    <div class="login_btn">
      <button @click="login" :disabled="canClick">登录</button>
    </div>

    <div class="login_des">
      <button
        type="text"
        class="agreement-btn"
        :class="{ agreed: isAgreed }"
        @click="agreeToTerms"
      >
        <span class="material-icons">check</span>
      </button>
      <p>
        未注册手机号登录后将自动生成账号，且代表您已阅读并同意
        <a href>《用户服务协议》</a>、
        <a href>《隐私政策》</a>
      </p>
    </div>
  </div>
</template>

<script>
import TheInputGroup from "../components/layout/TheInputGroup.vue";
import { Toast } from "vant";

export default {
  components: {
    TheInputGroup,
  },
  data() {
    return {
      tel: "",
      verificationCode: "",
      telErrorMsg: "",
      codeErrorMsg: "",
      inputBtnTextPassed: "获取验证码",
      isDisabledPassed: false,
      isAgreed: false,
      isAvailablePassed: false,
      // to be deleted after fixing api
      correctCode: "",
    };
  },
  computed: {
    canClick() {
      if (!this.tel || !this.verificationCode || !this.isAgreed) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    login() {
      // todo: verify code
      // todo: clear localStorage after 7 days
      // this.$axios
      //     .post("/api/posts/sms_back", {
      //         phone: this.tel,
      //         code: this.verificationCode
      //     })
      //     .then(() => {
      //         // console.log(res);
      //         localStorage.setItem("eleme_login", true);
      //         this.$router.push("/");
      //     })
      //     .catch(err => {
      //         this.codeErrorMsg = err.response.data.msg || '验证码错误，请重试'
      //     });
      console.log(this.tel, this.verificationCode);
      if (parseInt(this.verificationCode) !== parseInt(this.correctCode)) {
        this.codeErrorMsg = "验证码错误，请重试";
      } else {
        localStorage.setItem("eleme_login", true);
        const fakeUserId = "a-fake-id-333";
        this.$store.dispatch("getUser", {
          userId: fakeUserId,
          phone: this.tel,
        });
        this.$router.push(
          this.$route.query.redirect
            ? {
                name: this.$route.query.redirect,
                params: { userId: fakeUserId },
              }
            : "/"
        );
      }
    },
    sendCode() {
      const telValidationPassed = this.validateTel();
      if (telValidationPassed) {
        this.startCountDown();
        // this.$axios
        //     .post("/api/posts/sms_send", {
        //         tpl_id: "136729",
        //         key: "795be723dd9e88c3ea98e2b6713ab795",
        //         phone: this.tel
        //     })
        //     .then(res => {
        //         console.log(res);
        //     });
        let randCode = "";
        for (let i = 0; i < 4; i++) {
          let n = Math.floor(Math.random() * 10);
          randCode += n;
        }
        this.correctCode = randCode;
        this.verificationCode = this.correctCode;
        Toast(`验证码为：${this.verificationCode}`);
      }
    },
    validateTel() {
      this.isAvailablePassed = false;
      if (!this.tel) {
        this.telErrorMsg = "手机号码不能为空";
        return false;
      } else if (!/^1[345678]\d{9}$/.test(this.tel)) {
        this.telErrorMsg = "请填写正确的手机号码";
        return false;
      } else {
        this.telErrorMsg = "";
        this.isAvailablePassed = true;
        return true;
      }
    },
    startCountDown() {
      let counter = 60;
      let timer = setInterval(() => {
        if (counter === 0) {
          clearInterval(timer);
          this.inputBtnTextPassed = "获取验证码";
          this.isDisabledPassed = false;
        } else {
          this.inputBtnTextPassed = `${counter}秒后重新发送`;
          this.isDisabledPassed = true;
          counter--;
        }
      }, 1000);
    },
    agreeToTerms() {
      this.isAgreed = !this.isAgreed;
    },
    clearTel() {
      this.tel = "";
    },
  },
  watch: {
    tel() {
      this.validateTel();
    },
    verificationCode() {
      if (this.codeErrorMsg) {
        this.codeErrorMsg = "";
      }
    },
  },
  mounted() {},
  // beforeRouteEnter(to, from) {
  //     console.log(localStorage.getItem('eleme_login'))
  //     console.log(to, from)
  // }
};
</script>

<style scoped>
.login {
  height: 100%;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}

.logo {
  text-align: center;
}

.logo img {
  width: 150px;
}

.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}

.login_des {
  color: #aaa;
  line-height: 22px;
}

.login_des a {
  color: rgb(14, 179, 255);
  text-decoration: none;
}

.login_des p {
  display: inline;
}

.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 20px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}

.login_btn button[disabled] {
  background-color: #ccc;
}

.agreement-btn {
  border: 1px solid #ccc;
  border-radius: 100%;
  background-color: #fff;
  width: 17px;
  height: 17px;
  vertical-align: middle;
  display: inline;
  line-height: 18px;
  margin-bottom: 4px;
  padding: 0;
}

.agreement-btn span {
  font-size: 1rem;
  color: #fff;
}

.agreed {
  background-color: rgb(14, 179, 255);
  border: none;
}
</style>
