import { Message } from "element-ui";
import {
  toRegister,
  toLogin,
  homeInitData,
  getHouseById
} from "@/api/app.js";
const state = {
  homeData: [], // 用户管理表格数据
  homeDataTotal: 0,

  detailsData:{}
};
const mutations = {
  SET_HOME_DATA(state, payload) {
    state.homeData = payload;
  },
  SET_HTOTAL(state, payload) {
    state.homeDataTotal = payload;
  },

  SET_DETAILS_DATA(state, payload) {
    state.detailsData = payload;
  },
};
const actions = {
  register({ _ }, registerForm) {
    return new Promise((resolve, reject) => {
      toRegister(
        registerForm.username,
        registerForm.password,
        registerForm.telephone,
        registerForm.role
      ).then((res) => {
        if (res.code == "10") {
          Message({
            type: "success",
            message: "注册成功！",
          });
          resolve();
        } else if (res.code == "50") {
          Message({
            type: "error",
            message: res.message,
          });
          reject();
        }
      });
    });
  },


  login({ _ }, loginInfo) {
    return new Promise((resolve, reject) => {
      toLogin(loginInfo).then((res) => {
        if (res.code == "10") {
          Message({
            type: "success",
            message: "登录成功",
          });
          localStorage.setItem("userInfo", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.token);
          resolve();
        }
        else {
          Message({
            type: "error",
            message: res.message,
          });

          reject();
        }
      });
    });
  },

  homeInitData({ commit }, { pn, size, keyword }) {
    homeInitData(pn, size, keyword).then((res) => {
      commit("SET_HOME_DATA", res.data.page.records);
      commit("SET_HTOTAL", res.data.page.total);
    });
  },

  getHouseDetails({commit }, id) {
    getHouseById(id).then((res) => {
      commit("SET_DETAILS_DATA", res.data.house);
    });
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};