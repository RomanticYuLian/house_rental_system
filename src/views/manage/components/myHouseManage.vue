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
        <el-input placeholder="请输入地址或类型进行查询" size="small" v-model="keyword" @input="handleQuery">
        </el-input>
      </keep-alive>
      <!-- 表格 -->
      <el-table style="width: 100%" :data="myHouseData">
        <el-table-column prop="id" label="房屋ID" width="80px">
        </el-table-column>
        <el-table-column prop="imageUrl" label="房屋图片">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.imageUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="房屋类型">
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
            <el-button type="danger" plain size="mini" @click="deleteHouse(scope.row.id)">
              <i class="el-icon-delete-solid"></i>
            </el-button>
            <router-link :to="'/editHouse/' + scope.row.id">
              <el-button type="primary" plain size="mini" style="margin-left: 3px;">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="myHouseTotal">
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
      pagesize: 5,
      keyword: "",
    }
  },
  mounted() {
    this.gainMyHouseData();
  },
  computed: {
    ...mapGetters(["myHouseData", "myHouseTotal"]),
  },
  methods: {

    handleQuery() {
      this.gainMyHouseData()
    },
    gainMyHouseData() {
      this.$store.dispatch("manage/getMyHouseData", {
        pn: this.currentPage,
        size: this.pagesize,
        keyword: this.keyword,
      });
    },
    handleSizeChange(size) {
      this.pagesize = size
      this.gainMyHouseData()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.gainMyHouseData()
    },

    deleteHouse(id) {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("manage/deleteHouse", id);
          setTimeout(() => {
            this.gainMyHouseData();
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