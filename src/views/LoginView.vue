<template>
    <div class="login">

        <div class="logo">
            <img src="../assets/elemeLogo.svg" alt="eleme logo" />
        </div>

        <input-group
            inputType="number"
            v-model="tel"
            inputPlaceholder="手机号"
            :inputBtnText="inputBtnTextPassed"
            :isDisabled="isDisabledPassed"
            :errorMsg="errors.tel"
        ></input-group>

        <input-group
            inputType="number"
            v-model="verificationCode"
            inputPlaceholder="验证码"
            :errorMsg="errors.code"
        ></input-group>

        <div class="login_des">
            <p>
                新用户登录即自动注册，表示已同意<a href="">《用户服务协议》</a>
            </p>
        </div>

        <div class="login_btn">
            <button @click="show">登录</button>
        </div>

    </div>
</template>

<script>
import InputGroup from '../components/InputGroup.vue';

export default {
    components: {
        InputGroup
    },
    data() {
        return {
            tel: '',
            verificationCode: '',
            errors: {},
            inputBtnTextPassed: '获取验证码',
            isDisabledPassed: false,

        }
    },
    methods: {
        show(){
            console.log(this.tel);
            console.log(this.verificationCode);
        }
        
    },
    mounted() {
        
        
    },
}

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
    color: #4d90fe;
    text-decoration: none;
}
.login_btn button {
    width: 100%;
    height: 40px;
    background-color: #48ca38;
    border-radius: 4px;
    color: white;
    font-size: 14px;
    border: none;
    outline: none;
}
.login_btn button[disabled] {
    background-color: #8bda81;
}
</style>