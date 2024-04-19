import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import navigate from '../utils/navigate'
Vue.use(VueRouter)

let menu = [];

navigate.forEach((item) => {
  menu.push({
    path: item.path,
    name: item.name,
    component: item.component,
    children: item.children ? pushChildren(item.children) : [], //有子路由的调用pushChildren函数配置子路由
  });
});

function pushChildren(children) {
  const childroute = [];
  children.forEach((item) => {
    childroute.push({
      path: item.path,
      name: item.name,
      component: item.component,
    });
  });
  return childroute;
}

const routes = [
  {
    path: "/",
    // name: "Main", // 当某个路由有子级路由的时候，这时候父级路由需要一个默认的路由，所以父级路由不能定义name属性
    component: Main,
    children: menu,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register/Register.vue"),
    meta: { title: "注册" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue"),
    meta: { title: "登录" },
  },
]

const router = new VueRouter({
  routes
})

//登录注册路由守卫
router.beforeEach((to, from, next) => {
  let userInfo = localStorage.getItem("userInfo");
  if (to.path === "/login" || to.path === "/register") {
    //如果当前进入页面是登录或注册就不执行任何操作，继续进入。
    next();
  } else {
    //否则判断是否存在登录存储的数据，不存在就进入登录页面
    if (userInfo === null) {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;