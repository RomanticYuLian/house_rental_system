<!-- 安全设置 -->
<template>
    <div>
      <el-breadcrumb separator="/" class="header">
        <el-breadcrumb-item>
          <i class="el-icon-warning" style="margin-right: 8px"></i>
          设置中心
        </el-breadcrumb-item>
        <el-breadcrumb-item>安全设置</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="main">
        <el-form ref="loginFormRef" status-icon :model="password">
          <el-form-item label="原密码：">
            <el-input
              type="password"
              v-model="password.oldPassword"
              autocomplete="off"
              placeholder="请输入原密码"
            />
          </el-form-item>
          <el-form-item
            prop="newPassword"
            :rules="rules.passwordRules"
            label="新密码："
          >
            <el-input
              type="password"
              v-model="password.newPassword"
              autocomplete="off"
              placeholder="请设置新密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="editPassword">
              修改密码
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  import rules from "@/utils/validator.js";
  
  export default {
    name: "",
    data() {
      return {
        password: {
          oldPassword: "",
          newPassword: "",
        },
        rules,
      };
    },
    methods: {
      editPassword() {
        this.$store.dispatch("setting/editPwd", {
          oldPassword: this.password.oldPassword,
          newPassword: this.password.newPassword,
        });
      },
    },
  };
  </script>
  <style lang="less" scoped>
  .header {
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    background-color: #fff;
  }
  .main {
    margin: 15px;
    background-color: #fff;
    padding: 20px;
    display: flex;
    justify-content: center;
    .el-form {
      width: 300px;
    }
  }
  </style>