export default [
  //首页：全角色显示
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home"),
    title: "首页",
    icon: "el-icon-s-home",
    show: "all"
  },
  //------------------隐藏------------------------
  //详情页
  {
    path: "/details/:id",
    name: "details",
    component: () => import("@/views/home/details.vue"),
  },
  //------------------------------------------
  //管理中心：管理员
  {
    path: "/manage",
    name: "manage",
    component: () => import("@/views/manage/index.vue"),
    title: "管理中心",
    icon: "el-icon-s-help",
    show: "admin",
    children: [
      {
        path: "/userMange",
        name: "userMange",
        component: () => import("@/views/manage/components/userManage.vue"),
        title: "用户管理",
        icon: "el-icon-s-custom",
      },
      {
        path: "/houseManage",
        name: "houseManage",
        component: () => import("@/views/manage/components/houseManage.vue"),
        title: "房屋管理",
        icon: "el-icon-office-building",
      },
      {
        path: "/orderManage",
        name: "orderManage",
        component: () => import("@/views/manage/components/orderManage.vue"),
        title: "订单管理",
        icon: "el-icon-s-order",
      },
      {
        path: "/feedbackManage",
        name: "feedbackManage",
        component: () => import("@/views/manage/components/feedbackManage.vue"),
        title: "反馈管理",
        icon: "el-icon-s-comment",
      },
    ],
  },
  //管理中心：房主
  {
    path: "/manage2",
    name: "manage2",
    component: () => import("@/views/manage/index.vue"),
    title: "管理中心",
    icon: "el-icon-s-help",
    show: "landlord",
    children: [
      {
        path: "/myHouseManage",
        name: "myHouseManage",
        component: () => import("@/views/manage/components/myHouseManage.vue"),
        title: "房屋管理",
        icon: "el-icon-office-building",
      },
      {
        path: "/myOrderManage",
        name: "myOrderManage",
        component: () => import("@/views/manage/components/myOrderManage.vue"),
        title: "订单管理",
        icon: "el-icon-s-order",
      }
    ],
  },
  //--------------------隐藏----------------------
  //房屋编辑
  {
    path: "/editHouse/:id",
    name: "editHouse",
    component: () => import("@/views/manage/components/editHouse.vue"),
  },
  //------------------------------------------
  //发布中心：房主
  {
    path: "/publicHouse",
    name: "publicHouse",
    component: () => import("@/views/publicHouse/index.vue"),
    title: "房屋发布",
    icon: "el-icon-s-promotion",
    show: "landlord",
  },
  //收藏基地：租户
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/order/order.vue"),
    title: "订单基地",
    icon: "el-icon-shopping-cart-full",
    show: "lessee",
  },
  //-------------------隐藏-----------------------
  //支付页面
  {
    path: "/pay/:id",
    name: "pay",
    component: () => import("@/views/order/pay.vue"),
  },
  //------------------------------------------
  //反馈中心：用户
  {
    path: "/feedback",
    name: "feedback",
    component: () => import("@/views/feedback/index.vue"),
    title: "反馈中心",
    icon: "el-icon-s-comment",
    show: "user",
    children: [
      {
        path: "/getFeedback",
        name: "getFeedback",
        component: () => import("@/views/feedback/components/getFeedback.vue"),
        title: "我的反馈",
        icon: "el-icon-view",
      },
      {
        path: "/addFeedback",
        name: "addFeedback",
        component: () => import("@/views/feedback/components/addFeedback.vue"),
        title: "发布反馈",
        icon: "el-icon-aim",
      }
    ],
  },
  //设置：全角色
  {
    path: "/setting",
    name: "setting",
    component: () => import("@/views/setting/index.vue"),
    title: "设置",
    icon: "el-icon-setting",
    show: "all",
    children: [
      {
        path: "/personalSetting",
        name: "personalSetting",
        component: () =>
          import("@/views/setting/components/PersonalSetting.vue"),
        title: "信息设置",
        icon: "el-icon-user-solid",
      },
      {
        path: "/safeSetting",
        name: "safeSetting",
        component: () => import("@/views/setting/components/SafeSetting.vue"),
        title: "安全设置",
        icon: "el-icon-warning",
      },
    ],
  },
];