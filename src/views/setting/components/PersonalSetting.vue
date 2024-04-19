<!-- 个人设置 -->
<template>
    <div>
      <el-breadcrumb separator="/" class="header">
        <el-breadcrumb-item>
          <i class="el-icon-s-shop" style="margin-right: 8px"></i>
          设置中心
        </el-breadcrumb-item>
        <el-breadcrumb-item>信息设置</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="main">
        <el-form :model="userMessage" ref="userInfoRef" label-width="100px">
          <el-form-item label-width="180px">
            <el-upload
              class="uploadImage"
              :action="actionImgUrl"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
              :before-upload="beforeImgUpload"
              style="display: inline-block; margin-right: 20px"
            >
              <el-image
                :src="userInfo.imageUrl ? userInfo.imageUrl : '/img/unload.png'"
                class="headImage"
              ></el-image>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户名" prop="username" :rules="rules.usernameRules">
            <el-input
              v-model="userMessage.username"
              style="width: 280px"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="telephone" :rules="rules.telephoneRules">
            <el-input
              v-model.number="userMessage.telephone"
              style="width: 280px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="saveEdit('userInfoRef')"
              round
              style="margin-left: 75px"
              >保存修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  import { get } from "lodash-es";
  import rules from "@/utils/validator";
  
  export default {
    inject: ["reload"],
    data() {
      return {
        userMessage: {
          username: "",
          telephone: "",
        },
        rules, // 封装好的表单验证
        actionImgUrl: process.env.VUE_APP_BASE_URL + "/upload/upImage", // 上传图片的目的地址
      };
    },
    mounted() {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.userMessage.username = get(userInfo, "username", "");
      this.userMessage.telephone = get(userInfo, "telephone", "");
    },
    computed: {
      userInfo() {
        return JSON.parse(localStorage.getItem("userInfo"));
      },
    },
    methods: {
      //选择完图片后自动上传，并拿到服务器返回的图片url地址
      handleUploadSuccess(res) {
        this.$store.dispatch("setting/setHead", res.data.imageUrl);
        // 增加延时，先执行异步上传，再刷新页面
        setTimeout(() => {
          this.$store.dispatch("setting/gainUserInfo");
        }, 300);
        setTimeout(() => {
          this.reload();
        }, 500);
      },
      handleUploadError() {
        this.$message.error("上传失败，请重试");
      },
      // 对上传的文件类型及大小进行限制
      beforeImgUpload(file) {
        const isJPG =
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === "image/gif";
        const isLt20M = file.size / 1024 / 1024 < 20;
        if (!isJPG) {
          this.$notify.warning({
            title: "警告",
            message:
              "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片",
          });
        }
        if (!isLt20M) {
          this.$notify.warning({
            title: "警告",
            message: "图片大小必须小于20M",
          });
        }
        return isJPG && isLt20M;
      },
      saveEdit(userInfoRef) {
        this.$refs[userInfoRef].validate((valid) => {
          if (valid) {
            this.$store.dispatch("setting/setUserInfo", this.userMessage);
            setTimeout(() => {
              this.$store.dispatch("setting/gainUserInfo");
            }, 500);
          } else {
            console.log("error save!!");
            return false;
          }
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
      width: 60%;
    }
  }
  // 上传图片
  .uploadImage {
    width: 80px;
    height: 80px;
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    .headImage {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  </style>