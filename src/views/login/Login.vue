<!-- 登录 -->
<template>
    <div class="loginContainer">
        <div class="box">
            <h3 class="btitle">登录</h3>
            <el-form :model="loginForm" ref="loginFormRef" status-icon>
                <div class="bform">
                    <el-form-item prop="username" :rules="rules.usernameRules">
                        <el-input type="text" v-model="loginForm.username" autocomplete="off" placeholder="用户名" />
                    </el-form-item>
                    <el-form-item prop="password" :rules="rules.passwordRules">
                        <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"
                            @keyup.enter="handleLogin('loginFormRef')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleLogin('loginFormRef')" round class="login">登录</el-button>
                        <el-link :underline="false" type="primary" class="toRegister" @click="toRegister">去注册</el-link>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import rules from "../../utils/validator.js";

export default {
    data() {
        return {
            loginForm: {
                username: "",
                password: "",
            },
            rules,
        };
    },
    methods: {
        handleLogin(loginFormRef) {
            this.$refs.loginFormRef.validate((valid) => {
                if (valid) {

                    this.$store
                        .dispatch("app/login", this.loginForm)
                        .then(() => {
                            this.$router.push({
                                path: "/",
                            });
                        })
                        .catch(() => { });
                } else {
                    this.$notify.error({
                        title: " 错误",
                        message: " 请输入正确的用户名密码",
                    });
                    return false;
                }
            });
        },
        // 注册
        toRegister() {
            this.$router.push({
                path: "/register",
            });
            this.$refs.loginFormRef.resetFields();
        },
    },
};
</script>
<style lang="less" scoped>
.loginContainer {
    width: 45%;
    height: 70vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-left: 1px solid #e9ecef;
    border-top: 1px solid #e9ecef;
    border-radius: 20px;
    box-shadow: 6px 6px 6px #ced4da;
    background-color: #fff;
    text-align: center;
    background: url("/public/img/1.png");
    //全屏
    //width: 100%;
    //height: 100%;
    position: fixed;
    background-size: 100% 100%;
}

.box {
    width: 80%;
    height: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.btitle {
    font-size: 2.5em;
    font-family: "楷体";
    font-weight: bold;
    color: #541c98;
}

.bform {
    width: 100%;
    height: 100%;
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-top: 30px;
}

.toRegister {
    font-size: 1em;
    margin-left: 85px;
    color: #999;
}
</style>