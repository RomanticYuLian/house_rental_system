<!-- 注册 -->
<template>
    <div class="loginContainer">
        <div class="box">
            <h3 class="btitle">注册</h3>
            <el-form :model="registerForm" ref="registerFormRef" label-width="80px" status-icon :rules="rules"
                class="bform">
                <el-form-item prop="username" :rules="rules.usernameRules" label="用户名：">
                    <el-input type="text" v-model="registerForm.username" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="password" :rules="rules.passwordRules" label="密码：">
                    <el-input type="password" v-model="registerForm.password" autocomplete="off"
                        @keyup.enter="handleRegister('registerFormRef')" />
                </el-form-item>
                <el-form-item prop="telephone" :rules="rules.telephoneRules" label="电话：">
                    <el-input type="text" v-model="registerForm.telephone" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="role" label="角色：">
                    <el-select v-model="registerForm.role" placeholder="请选择角色" size="small">
                        <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleRegister('registerFormRef')" round class="login">注册</el-button>
                    <el-link :underline="false" type="primary" class="toLogin" @click="toLogin">去登录</el-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

import rules from "../../utils/validator.js";

export default {
    name: "",
    data() {
        return {
            registerForm: {
                username: "",
                password: "",
                telephone: "",
                role: "", // 1为房主，2为普通用户
            },
            options: [
                {
                    value: 1,
                    label: "房主",
                },
                {
                    value: 2,
                    label: "普通用户",
                },
            ],
            rules,
        };
    },
    methods: {
        handleRegister() {
            this.$refs.registerFormRef.validate((valid) => {
                if (valid) {
                    this.$store.dispatch("app/register", this.registerForm);
                }
            });
        },
        // 去登录
        toLogin() {
            this.$router.push({
                path: "/login",
            });
            this.$refs.registerFormRef.resetFields();
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
    align-items: center;
}

.toLogin {
    font-size: 1em;
    margin-left: 85px;
    color: #999;
}
</style>