<template>
  <div>
    <el-breadcrumb separator="/" class="header">
      <el-breadcrumb-item>
        <i class="el-icon-s-comment" style="margin-right: 8px"></i>
        反馈中心
      </el-breadcrumb-item>
      <el-breadcrumb-item>发布反馈</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-form :model="formData" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="反馈内容" prop="content" :rules="rules.rule">
          <el-input type="textarea" v-model="formData.content" autocomplete="off"
            style="font-size: larger;margin-top: 10px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save()">提交</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        content: "",
      },
      rules: {
        rule: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],
      }
    }
  },
  methods: {
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch("feedback/addFeedback", this.formData.content);
          setTimeout(() => {
            this.reset();
          }, 1000);
        }
      });
    },
    // 重置
    reset() {
      this.formData.content = ""
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
  margin-top: 50px;
  margin-left: 60px;
  margin-right: 60px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>