<template>
  <div>
    <el-breadcrumb separator="/" class="header">
      <el-breadcrumb-item>
        <i class="el-icon-s-home" style="margin-right: 8px"></i>
        首页
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="goods-list-container">
      <!-- 查询 -->
      <keep-alive>
        <el-input placeholder="请输入地址或类型进行查询" size="small" v-model="keyword" @input="handleQuery">
        </el-input>
      </keep-alive>
      <el-row :gutter="20">
        <el-col v-for="(item, index) in homeData" :key="index" :lg="8" :md="8" :sm="8" :xl="6" :xs="24">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div class="goods-list-card-body">
              <div class="goods-list-tag-group">
                <el-tag v-if="item.status === 1" hit type="success">在租</el-tag>
                <el-tag v-if="item.status === 0" hit type="danger">下架</el-tag>
              </div>
              <div class="add-cart" v-if="userInfo.role == 2">
                <el-button type="primary" size="mini" plain @click="addCart(item.id)">
                  <i class="el-icon-circle-plus-outline" style="color:blueviolet;">添加</i>
                </el-button>
              </div>
              <div class="goods-details">
                <router-link :to="'/details/' + item.id">查看详情</router-link>
              </div>
              <div class="goods-list-image-group">
                <img class="goods-list-image" :src="item.imageUrl" />
              </div>
              <div class="goods-list-type">
                {{ item.type }}
              </div>
              <div class="goods-list-address">
                {{ item.address }}
              </div>
              <div class="goods-list-price">
                <span>¥ {{ item.price }} 元</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[6, 9, 15, 21, 30]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="homeDataTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 6,
      keyword: "",
      table: false,
    }
  },
  mounted() {
    this.gainHomeData();
  },
  computed: {
    ...mapGetters(["homeData", "homeDataTotal"]),

    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo"));
    },
  },
  methods: {

    handleQuery() {
      this.gainHomeData()
    },
    gainHomeData() {
      this.$store.dispatch("app/homeInitData", {
        pn: this.currentPage,
        size: this.pagesize,
        keyword: this.keyword,
      });
    },
    handleSizeChange(size) {
      this.pagesize = size
      this.gainHomeData()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.gainHomeData()
    },

    addCart(id) {
      this.$confirm("确定要添加吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$store.dispatch("order/addOrder", id);
        })
    },

  },

}
</script>

<style lang="less" scoped>
.header {
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  background-color: #fff;
}

.el-row {
  margin-top: 20px;
}

.goods-list-container {
  margin-top: 10px;

  .goods-list-card-body {
    position: relative;
    text-align: center;
    cursor: pointer;

    .goods-list-tag-group {
      position: absolute;
      top: 10px;
      right: 5px;
      z-index: 9;
    }

    .add-cart {
      position: absolute;
      bottom: 15px;
      margin-left: 15px;
    }

    .goods-details {
      position: absolute;
      bottom: 15px;
      right: 20px;

      a {
        text-decoration: none;
      }
    }

    .goods-list-image-group {
      height: 400px;
      overflow: hidden;

      .goods-list-image {
        width: 100%;
        height: 400px;
        transition: all ease-in-out 0.3s;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .goods-list-type {
      margin: 8px 0;
      font-size: 16px;
      font-weight: bold;
    }

    .goods-list-address {
      font-size: 14px;
      color: #808695;
    }

    .goods-list-price {
      margin: 8px 0;
      font-size: 14px;
      color: orange;

      s {
        color: #c5c8ce;
      }
    }
  }
}

.el-pagination {
  text-align: center;
  margin-top: 15px;
}
</style>