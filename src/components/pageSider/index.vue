<!-- 侧边栏菜单 -->
<template>
  <div class="asideContainer">
    <!-- 菜单 -->
    <el-menu class="el-menu-vertical-demo" background-color="#12191a" text-color="#e1e3e6" active-text-color="#3c9cff"
      router unique-opened :default-active="$route.path">
      <el-menu-item class="title">
        <img src="@/assets/logo.png" alt="" />
        <span>房屋出租系统</span>
      </el-menu-item>
      <fragment v-for="(item, index) in navigate" :key="item.path">
        <!-- 一级菜单（没有任何子级菜单）-->
        <el-menu-item :index="item.path" v-if="!item.children && item.show == 'landlord' && userInfo.role == 1">
          <i :class="item.icon"></i>
          <span>
            {{ item.title }}
          </span>
        </el-menu-item>
        <el-menu-item :index="item.path" v-if="!item.children && item.show == 'lessee' && userInfo.role == 2">
          <i :class="item.icon"></i>
          <span>
            {{ item.title }}
          </span>
        </el-menu-item>
        <el-menu-item :index="item.path" v-if="!item.children && item.show == 'all'">
          <i :class="item.icon"></i>
          <span>
            {{ item.title }}
          </span>
        </el-menu-item>

        <!-- 一级菜单（有子级菜单）admin-->
        <el-submenu :index="item.path" v-if="item.children && item.show == 'admin' && userInfo.role == 0">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <!-- 遍历二级菜单容器 -->
          <fragment v-for="(i, index) in item.children" :key="i.path">
            <el-menu-item :index="i.path">
              <i :class="i.icon"></i>
              <span>{{ i.title }}</span>
            </el-menu-item>
          </fragment>
        </el-submenu>

        <!-- 一级菜单（有子级菜单）landlord-->
        <el-submenu :index="item.path" v-if="item.children && item.show == 'landlord' && userInfo.role == 1">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <!-- 遍历二级菜单容器 -->
          <fragment v-for="(i, index) in item.children" :key="i.path">
            <el-menu-item :index="i.path">
              <i :class="i.icon"></i>
              <span>{{ i.title }}</span>
            </el-menu-item>
          </fragment>
        </el-submenu>

        <!-- 一级菜单（有子级菜单）user-->
        <el-submenu :index="item.path" v-if="item.children && item.show == 'user' && userInfo.role !== 0">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <!-- 遍历二级菜单容器 -->
          <fragment v-for="(i, index) in item.children" :key="i.path">
            <el-menu-item :index="i.path">
              <i :class="i.icon"></i>
              <span>{{ i.title }}</span>
            </el-menu-item>
          </fragment>
        </el-submenu>

        <!-- 一级菜单（有子级菜单）all-->
        <el-submenu :index="item.path" v-if="item.children && item.show == 'all'">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <!-- 遍历二级菜单容器 -->
          <fragment v-for="(i, index) in item.children" :key="i.path">
            <el-menu-item :index="i.path">
              <i :class="i.icon"></i>
              <span>{{ i.title }}</span>
            </el-menu-item>
          </fragment>
        </el-submenu>
      </fragment>
    </el-menu>
  </div>
</template>

<script>
import navigate from "@/utils/navigate.js";

export default {
  data() {
    return {
      navigate: navigate,
    };
  },
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo"));
    },
  },
};
</script>
<style lang="less" scoped>
.asideContainer {
  height: 100%;

  .title {
    height: 60px;
    line-height: 60px;
    padding-left: 30px;
    background-color: #2f4050;

    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }

    span {
      font-size: 20px;
      color: #fff;
    }
  }
}

// 菜单
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>