<template>
  <div>
    <el-breadcrumb separator="/" class="header">
      <el-breadcrumb-item>
        <i class="el-icon-user-solid" style="margin-right: 8px"></i>
        管理中心
      </el-breadcrumb-item>
      <el-breadcrumb-item>房屋管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <!-- 查询 -->
      <keep-alive>
        <el-input placeholder="请输入房主或地址或类型进行查询" size="small" v-model="keyword" @input="handleQuery">
        </el-input>
      </keep-alive>
      <!-- 表格 -->
      <el-table style="width: 100%" :data="homeData">
        <el-table-column prop="id" label="房屋ID" width="80px">
        </el-table-column>
        <el-table-column prop="imageUrl" label="房屋图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.imageUrl"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="房屋类型">
        </el-table-column>
        <el-table-column prop="username" label="房主">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="price" label="价格">
        </el-table-column>
        <el-table-column prop="about" label="简介">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status == 1 ? "在租" : "下架" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button type="danger" plain size="mini" @click="freezeHouse(scope.row.id)">下架</el-button>
            <el-button type="primary" plain size="mini" @click="unfreezeHouse(scope.row.id)">上架</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
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
      pagesize: 20,
      keyword: "",
    }
  },
  mounted() {
    this.gainHomeData();
  },
  computed: {
    ...mapGetters(["homeData", "homeDataTotal"]),
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

    freezeHouse(id) {
      this.$confirm("确定要下架吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("manage/freezeHouse", id);
          setTimeout(() => {
            this.gainHomeData();
          }, 500);
        })
    },

    unfreezeHouse(id) {
      this.$confirm("确定要上架吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("manage/unfreezeHouse", id);
          setTimeout(() => {
            this.gainHomeData();
          }, 500);
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