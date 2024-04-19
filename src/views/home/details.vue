<template>
    <div>
        <el-breadcrumb separator=">>" class="header">
            <el-breadcrumb-item>
                <router-link :to="'/'">
                    <i class="el-icon-s-home" style="margin-right: 8px"></i>
                    首页
                </router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>信息详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main">
            <div class="description">
                <el-descriptions title="房屋信息列表" :column="1" border>
                    <el-descriptions-item label="房主" label-class-name="my-label" content-class-name="my-content">
                        {{ detailsData.username }}
                    </el-descriptions-item>
                    <el-descriptions-item label="类型" label-class-name="my-label" content-class-name="my-content">
                        {{ detailsData.type }}
                    </el-descriptions-item>
                    <el-descriptions-item label="地址" label-class-name="my-label" content-class-name="my-content">
                        {{ detailsData.address }}
                    </el-descriptions-item>
                    <el-descriptions-item label="价格" label-class-name="my-label" content-class-name="my-content">
                        {{ detailsData.price }}元
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            <div class="demo-image">
                <p style="font-style: oblique;">房屋图片:</p>
                <el-image style="width: 450px; height:450px" :src="detailsData.imageUrl">
                </el-image>
            </div>
            <div class="about_text">
                <p style="font-style: oblique;">简介:</p>
                {{ detailsData.about }}
            </div>
            <div style="margin-top: 40px;margin-top: 40px;margin-left: 32px;">
                <router-link to="/">
                    <el-button type="primary" plain>返回</el-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
    data() {
        return {
            houseId: Number
        };
    },
    mounted() {
        this.gainDetailsData();
    },
    computed: {
        ...mapGetters(["detailsData"]),
    },

    created() {
        // 根据路由参数获取商品信息
        const id = this.$route.params.id;
        this.houseId = id;
    },
    methods: {
        gainDetailsData() {
            this.$store.dispatch("app/getHouseDetails", this.houseId);
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
    margin: 15px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

    .description {
        margin-left: 30px;
        margin-right: 30px;
        width: 450px;

        .my-label {
            background-color: #e1f3d8;
            width: 49px;
        }

        .my-content {
            background-color: #FDE2E2;
        }
    }

    .demo-image {
        margin-left: 30px;
        margin-right: 30px;
        height: 480px;
        width: 480px;
    }

    .about_text {
        margin-left: 30px;
        margin-right: 30px;
    }
}
</style>