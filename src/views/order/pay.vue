<template>
    <div>
        <el-breadcrumb separator=">>" class="header">
            <el-breadcrumb-item>
                <router-link :to="'/order'">
                    <i class="el-icon-shopping-cart-full" style="margin-right: 8px"></i>
                    订单基地
                </router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>支付</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main">
            <div class="description">
                <el-descriptions title="订单详情" :column="1" border>
                    <el-descriptions-item label="房主" label-class-name="my-label" content-class-name="my-content">
                        {{ orderDetails.landlordName }}
                    </el-descriptions-item>
                    <el-descriptions-item label="类型" label-class-name="my-label" content-class-name="my-content">
                        {{ orderDetails.type }}
                    </el-descriptions-item>
                    <el-descriptions-item label="地址" label-class-name="my-label" content-class-name="my-content">
                        {{ orderDetails.address }}
                    </el-descriptions-item>
                    <el-descriptions-item label="价格" label-class-name="my-label" content-class-name="my-content">
                        {{ orderDetails.price }}元
                    </el-descriptions-item>
                    <el-descriptions-item label="创建时间" label-class-name="my-label" content-class-name="my-content">
                        {{ orderDetails.createTime }}
                    </el-descriptions-item>
                </el-descriptions>
                <el-result v-if="orderDetails.status == 1" icon="success" title="支付成功">
                </el-result>
                <span>
                    <el-button v-if="orderDetails.status == 0" type="primary" plain @click="pay()"
                        style="margin-left: 150px;margin-top: 10px;">支付</el-button>
                    <el-button v-else="orderDetails.status==1" disabled type="primary"
                        style="margin-left: 150px;margin-top: 10px;">支付</el-button>
                    <router-link to="/order" style="margin-left: 15px;">
                        <el-button>返回</el-button>
                    </router-link>
                </span>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
    data() {
        return {
            orderId: Number
        };
    },
    mounted() {
        this.gainDetails();
    },
    computed: {
        ...mapGetters(["orderDetails"]),
    },

    created() {
        // 根据路由参数获取信息
        const id = this.$route.params.id;
        this.orderId = id;
    },
    methods: {
        gainDetails() {
            this.$store.dispatch("order/getOrderDetails", this.orderId);
        },
        pay() {
            this.$confirm("确定要支付吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "info",
            })
                .then(() => {
                    this.$store.dispatch("order/payOrder", this.orderId);
                    setTimeout(() => {
                        this.gainDetails();
                    }, 500);
                })
        }
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