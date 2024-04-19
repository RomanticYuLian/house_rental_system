<!-- 用户管理 -->
<template>
  <div>
    <el-breadcrumb separator="/" class="header">
      <el-breadcrumb-item>
        <i class="el-icon-user-solid" style="margin-right: 8px"></i>
        管理中心
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <!-- 查询 -->
      <keep-alive>
        <el-input placeholder="请输入用户名或手机号进行查询" size="small" v-model="keyword" @input="handleQuery">
        </el-input>
      </keep-alive>
      <!-- 表格 -->
      <el-table style="width: 100%" :data="userManageData">
        <el-table-column prop="id" label="用户ID" width="80px">
        </el-table-column>
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="telephone" label="手机号">
        </el-table-column>
        <el-table-column prop="role" label="账号类型">
          <template slot-scope="scope">
            <span>{{ scope.row.role == 1 ? "房主" : "普通用户" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime.split("T")[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="active" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.active == 1 ? "正常" : "冻结" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button type="danger" plain size="mini" @click="freezeUser(scope.row.id)">冻结</el-button>
            <el-button type="primary" plain size="mini" @click="unfreezeUser(scope.row.id)">解冻</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="userManageTotal">
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
    this.gainUserManageData();
  },
  computed: {
    ...mapGetters(["userManageData", "userManageTotal"]),
  },
  methods: {
    handleQuery() {
      this.gainUserManageData();
    },
    gainUserManageData() {
      this.$store.dispatch("manage/getUserManageData", {
        pn: this.currentPage,
        size: this.pagesize,
        keyword: this.keyword,
      });
    },
    // 冻结用户
    freezeUser(id) {
      this.$confirm("确定要冻结这个用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("manage/freezeUser", id);
          setTimeout(() => {
            this.gainUserManageData();
          }, 500);
        })
    },
    // 解冻用户
    unfreezeUser(id) {
      this.$confirm("确定要解冻这个用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("manage/unfreezeUser", id);
          setTimeout(() => {
            this.gainUserManageData();
          }, 500);
        })
    },

    // 每页条数发生变化时
    handleSizeChange(size) {
      this.pagesize = size;
      this.gainUserManageData();
    },
    // 当前页改变时
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.gainUserManageData();
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
