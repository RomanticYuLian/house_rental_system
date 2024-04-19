<template>
    <div>
      <el-breadcrumb separator="/" class="header">
        <el-breadcrumb-item>
          <i class="el-icon-shopping-cart-full" style="margin-right: 8px"></i>
          订单基地
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="main">
        <!-- 查询 -->
        <keep-alive>
          <el-input placeholder="请输入地址或类型进行查询" size="small" v-model="keyword" @input="handleQuery">
          </el-input>
        </keep-alive>
        <!-- 表格 -->
        <el-table style="width: 100%" :data="myOrderData">
          <el-table-column prop="id" label="订单ID" width="80px">
          </el-table-column>
          <el-table-column prop="imageUrl" label="图片">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.imageUrl"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="landlordName" label="房主">
          </el-table-column>
          <el-table-column prop="type" label="类型">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
          <el-table-column prop="price" label="价格">
            <template slot-scope="scope">
              {{ scope.row.price }} 元
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span>
                <el-tag size="small" v-if="scope.row.status == 0">{{ "未支付" }}</el-tag>
                <el-tag size="small" type="success" v-else>{{ "已支付" }}</el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="150px">
            <template slot-scope="scope">
              <el-button type="danger" plain size="mini" @click="deleteOrder(scope.row.id)">删除</el-button>
              <router-link :to="'/pay/' + scope.row.id" v-if="scope.row.status===0">
              <el-button type="primary" plain size="mini" style="margin-left: 5px;">
                <i class="el-icon-thumb">支付</i>
              </el-button>
            </router-link>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
          :total="myOrderTotal">
        </el-pagination>
      </div>
    </div>
  </template>
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    data() {
      return {
        currentPage: 1, //初始页
        pagesize: 5, //每页的数据
        keyword: "",
      };
    },
    mounted() {
      this.gainMyOrderData();
    },
    computed: {
      ...mapGetters(["myOrderData", "myOrderTotal"]),
    },
    methods: {
      handleQuery() {
        this.gainMyOrderData();
      },
      gainMyOrderData() {
        this.$store.dispatch("order/getMyOrderData", {
          pn: this.currentPage,
          size: this.pagesize,
          keyword: this.keyword,
        });
      },
      deleteOrder(id) {
        this.$confirm("确定要删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$store.dispatch("manage/deleteOrder", id);
            setTimeout(() => {
              this.gainMyOrderData();
            }, 500);
          })
      },
  
      // 每页条数发生变化时
      handleSizeChange(size) {
        this.pagesize = size;
        this.gainMyOrderData();
      },
      // 当前页改变时
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.gainMyOrderData();
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    .el-table {
      margin-top: 30px;
    }
  }
  
  .el-pagination {
    text-align: center;
    margin-top: 15px;
  }
  </style>