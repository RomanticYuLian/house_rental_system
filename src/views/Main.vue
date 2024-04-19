<template>
  <div>
    <el-container class="home-container">
      <el-aside width="200px">
        <pageSider class="page-sider"></pageSider>
      </el-aside>
      <el-container>
        <el-header>
          <pageHeader></pageHeader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>

import pageSider from "@/components/pageSider/index.vue";
import pageHeader from "@/components/pageHeader/index.vue";

export default {
  name: "Main",
  components: { pageSider, pageHeader },
};

</script>

<style scoped lang="less">
.home-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.el-aside {
  height: 100%;
  background-color: #12191a;
  overflow: hidden;
}

.page-sider {
  height: 100%;
}

.el-header {
  padding: 0;
  margin: 0;
}

.el-main {
  padding: 0;
  overflow-x: hidden;
}
</style>
