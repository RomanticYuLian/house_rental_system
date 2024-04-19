<template>
    <div>
        <el-breadcrumb separator=">>" class="header">
            <el-breadcrumb-item>
                <router-link :to="'/myHouseManage'">
                    <i class="el-icon-office-building" style="margin-right: 8px"></i>
                    房屋管理
                </router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main">
            <el-form :model="detailsData" label-position="top">
                <el-form-item label="房屋类型">
                    <el-input style="width: 500px" v-model="detailsData.type"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload class="uploadImage" :action="actionImgUrl" :show-file-list="false"
                        :on-success="handleUploadSuccess" :on-error="handleUploadError"
                        :before-upload="beforeImgUpload">
                        <el-image :src="detailsData.imageUrl" class="headImage" v-if="detailsData.imageUrl"></el-image>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item style="width: 500px" label="地址">
                    <el-input v-model="detailsData.address"></el-input>
                </el-form-item>
                <el-form-item style="width: 500px" label="价格 (单位：元)">
                    <el-input v-model="detailsData.price"></el-input>
                </el-form-item>
                <el-form-item style="width: 500px;" label="简介">
                    <el-input type="textarea" v-model="detailsData.about"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="saveEdit()"
                        style="margin-left: 10px;margin-top: 10px;">保存修改</el-button>
                    <router-link to="/myHouseManage" style="margin-left: 15px;">
                        <el-button>返回</el-button>
                    </router-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
    data() {
        return {
            id: Number,
            actionImgUrl: process.env.VUE_APP_BASE_URL + "/upload/upImage", // 上传图片的目的地址
        };
    },
    mounted() {
        this.gainHouseData();
    },
    computed: {
        ...mapGetters(["detailsData"]),
    },

    created() {
        // 根据路由参数获取商品信息
        this.id = this.$route.params.id;
    },
    methods: {
        gainHouseData() {
            this.$store.dispatch("app/getHouseDetails", this.id);
        },

        handleUploadSuccess(res) {
            this.detailsData.imageUrl = res.data.imageUrl;
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
        saveEdit() {
            this.$store.dispatch("manage/updateHouse",
                {
                    id: this.detailsData.id,
                    type: this.detailsData.type,
                    imageUrl: this.detailsData.imageUrl,
                    address: this.detailsData.address,
                    price: this.detailsData.price,
                    about: this.detailsData.about
                });
            setTimeout(() => {
                this.$store.dispatch("app/getHouseDetails", this.id);
            }, 500);
        },
    }
}
</script>

<style lang="less" scoped>
.header {
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    background-color: #fff;
}

.main {
    margin-left: 20px;
    margin-top: 15px;
    margin-right: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.uploadImage {
    width: 200px;
    height: 200px;
    line-height: 100px;
    border: 1px dashed #d9d9d9;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-align: center;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>