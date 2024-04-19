<template>
  <div>
    <el-breadcrumb separator="/" class="header">
      <el-breadcrumb-item>
        <i class="el-icon-user-solid" style="margin-right: 8px"></i>
        管理中心
      </el-breadcrumb-item>
      <el-breadcrumb-item>反馈管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <!-- 查询 -->
      <keep-alive>
        <el-input placeholder="请输入发送者或内容进行查询" size="small" v-model="keyword" @input="handleQuery">
        </el-input>
      </keep-alive>
      <el-table style="width: 100%" :data="feedbackManageData">
        <el-table-column prop="id" label="反馈ID" width="80px">
        </el-table-column>
        <el-table-column prop="username" label="发送者" width="160px">
        </el-table-column>
        <el-table-column prop="sendTime" label="发送时间" width="200px">
        </el-table-column>
        <el-table-column prop="content" label="内容">
        </el-table-column>
        <el-table-column prop="" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button type="danger" plain size="mini" @click="deleteFeedback(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="feedbackManageTotal">
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
    this.gainFeedbackData();
  },
  computed: {
    ...mapGetters(["feedbackManageData", "feedbackManageTotal"]),
  },
  methods: {
    handleQuery() {
      this.gainFeedbackData()
    },
    gainFeedbackData() {
      this.$store.dispatch("manage/getFeedbackManageData", {
        pn: this.currentPage,
        size: this.pagesize,
        keyword: this.keyword,
      });
    },
    handleSizeChange(size) {
      this.pagesize = size
      this.gainFeedbackData()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.gainFeedbackData()
    },

    deleteFeedback(id) {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("manage/deleteFeedback", id);
          setTimeout(() => {
            this.gainFeedbackData();
          }, 500);
        })
    
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

  .el-table {
    margin-top: 30px;
  }
}

.el-pagination {
  text-align: center;
  margin-top: 15px;
}
</style>