<!-- 框架头部 -->
<template>
    <div>
        <div class="headerContainer">
            <div class="right">
                <el-dropdown>
                    <div style="cursor: pointer">
                        <el-image :src="userInfo.imageUrl ? userInfo.imageUrl : '/img/unload.png'"
                            class="headImage"></el-image>
                        <span>{{ userInfo.username }}</span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <span @click="personalSet">
                                <i class="el-icon-setting"></i>
                                个人设置
                            </span>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <span @click="logout">
                                <i class="el-icon-switch-button"></i>
                                退出登录
                            </span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    inject: ["reload"],
    data() {
        return {};
    },
    computed: {
        userInfo() {
            return JSON.parse(localStorage.getItem("userInfo"));
        },
    },
    mounted() {
        
    },
    methods: {

        // 跳转到个人设置页面
        personalSet() {
            this.$router.push({
                path: "personalSetting",
            });
        },
        // 退出登录
        logout() {
            if (localStorage.getItem("token")) {
                this.$confirm("确定要退出吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        setTimeout(() => {
                            this.reload();
                        }, 500);
                        localStorage.removeItem("token");
                        localStorage.removeItem("userInfo");
                        this.$message.warning("已退出登录");
                        this.$router.push({
                            path: "/login",
                        });
                    })
                    .catch((err) => { });
            }
        },
    },
};
</script>
<style lang="less" scoped>
.headerContainer {
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    background-color: #cceff8;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);

    .left {
        float: left;

        i {
            margin-left: 15px;
        }
    }

    .right {
        float: right;
        font-size: 14px;
        margin-right: 30px;

        .headImage {
            width: 30px;
            height: 30px;
            margin-right: 5px;
            border-radius: 50%;
            vertical-align: middle;
            border: 1px solid #43a6d8;
        }

        span {
            margin-right: 25px;
        }

        i {
            color: #43a6d8;
        }
    }
}
</style>