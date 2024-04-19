import { Message } from "element-ui";
import { getUserInfo, settingUserInfo, editPassword, setHeadImage } from "@/api/setting"

const state = {};
const mutations = {};
const actions = {
  // 设置用户信息
  setUserInfo({ _ }, userMessage) {
    settingUserInfo(
      userMessage.username,
      userMessage.telephone,
    ).then((res) => {
      if (res.code == "10") {
        Message({
          type: "success",
          message: res.message,
        });
      } else if (res.code == "50") {
        Message({
          type: "error",
          message: res.message,
        });
      }
    });
  },

  // 获取用户信息
  gainUserInfo({ _ }) {
    getUserInfo().then((res) => {
      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
    });
  },

  // 修改头像
  setHead({ _ }, imageUrl) {
    setHeadImage(imageUrl).then((res) => {
      if (res.code == "10") {
        Message({
          type: "success",
          message: res.message,
        });
      } else if (res.code == "50") {
        Message({
          type: "error",
          message: res.message,
        });
      }
    });
  },

  // 修改密码
  editPwd({ commit }, {oldPassword, newPassword}) {
    editPassword(oldPassword, newPassword).then((res) => {
      if (res.code == "10") {
        Message({
          type: "success",
          message: res.message,
        });
      } else if (res.code == "50") {
        Message({
          type: "error",
          message: "原密码错误",
        });
      }
    });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};