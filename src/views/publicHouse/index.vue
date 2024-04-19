<template>
    <div>
        <el-breadcrumb separator=">>" class="header">
            <el-breadcrumb-item>
                <i class="el-icon-s-promotion" style="margin-right: 8px"></i>
                房屋发布
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main">
            <el-form :model="houseForm" ref="formDataRef" :rules="rules" label-position="top">
                <el-form-item label="房屋类型" prop="type" :rules="rules.houseType">
                    <el-input style="width: 500px" v-model="houseForm.type" placeholder="请输入房屋类型"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload class="uploadImage" :action="actionImgUrl" :show-file-list="false"
                        :on-success="handleUploadSuccess" :on-error="handleUploadError"
                        :before-upload="beforeImgUpload">
                        <el-image :src="houseForm.imageUrl" v-if="houseForm.imageUrl"></el-image>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item style="width: 500px" label="地址" prop="address" :rules="rules.houseAddress">
                    <el-input v-model="houseForm.address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item style="width: 500px" label="价格 (单位：元)" prop="price" :rules="rules.housePrice">
                    <el-input v-model="houseForm.price" placeholder="请输入价格"></el-input>
                </el-form-item>
                <el-form-item style="width: 500px;" label="简介">
                    <el-input type="textarea" v-model="houseForm.about"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="saveEdit()"
                        style="margin-left: 10px;margin-top: 10px;">发布</el-button>
                    <el-button type="info" plain @click="resetForm()"
                        style="margin-left: 10px;margin-top: 10px;">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            houseForm: {
                address: "",
                type: "",
                price: "",
                about: "",
                imageUrl: ""
            },
            actionImgUrl: process.env.VUE_APP_BASE_URL + "/upload/upImage", // 上传图片的目的地址
            rules: {
                houseAddress: [
                    {
                        required: true,
                        message: "地址不能为空",
                        trigger: "blur",
                    },
                ],
                houseType: [
                    {
                        required: true,
                        message: "类型不能为空",
                        trigger: "blur",
                    },
                ],
                housePrice: [
                    {
                        required: true,
                        message: "价格不能为空",
                        trigger: "blur",
                    },
                ],
            }

        };
    },
    methods: {

        handleUploadSuccess(res) {
            this.houseForm.imageUrl = res.data.imageUrl;
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
            this.$refs.formDataRef.validate((valid) => {
                if (valid) {
                    this.$store.dispatch("publicHouse/addHouse",
                        {
                            type: this.houseForm.type,
                            imageUrl: this.houseForm.imageUrl,
                            address: this.houseForm.address,
                            price: this.houseForm.price,
                            about: this.houseForm.about
                        });
                    setTimeout(() => {
                        this.resetForm();
                    }, 1000);
                } else {
                    return false;
                }
            });
        },
        // 重置表单
        resetForm() {
            this.houseForm.type = "",
            this.houseForm.imageUrl = "",
            this.houseForm.address = "",
            this.houseForm.price = "",
            this.houseForm.about = ""
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