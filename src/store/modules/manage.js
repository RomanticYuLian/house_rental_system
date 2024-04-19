import { Message } from "element-ui";
import {
    getUserManageData,
    freezeUser,
    unfreezeUser,
    freezeHouse,
    unfreezeHouse,
    getFeedbackManageData,
    deleteFeedback,
    getOrderManageData,
    deleteOrder,
    getMyHouseData,
    deleteHouse,
    updateHouse
} from "@/api/manage";

const state = {
    userManageData: [], // 用户管理表格数据
    userManageTotal: 0,

    feedbackManageData: [], // 反馈管理表格数据
    feedbackManageTotal: 0,

    orderManageData: [], // 订单管理表格数据
    orderManageTotal: 0,

    myHouseData: [],
    myHouseTotal: 0,
};
const mutations = {
    SET_USER_MANAGE_DATA(state, payload) {
        state.userManageData = payload;
    },
    SET_UTOTAL(state, payload) {
        state.userManageTotal = payload;
    },

    SET_FEEDBACK_MANAGE_DATA(state, payload) {
        state.feedbackManageData = payload;
    },
    SET_FTOTAL(state, payload) {
        state.feedbackManageTotal = payload;
    },

    SET_ORDER_MANAGE_DATA(state, payload) {
        state.orderManageData = payload;
    },
    SET_OTOTAL(state, payload) {
        state.orderManageTotal = payload;
    },

    SET_MY_HOUSE_DATA(state, payload) {
        state.myHouseData = payload;
    },
    SET_MHTOTAL(state, payload) {
        state.myHouseTotal = payload;
    },
};
const actions = {
    // 获取用户管理表格数据
    getUserManageData({ commit }, { pn, size, keyword }) {
        getUserManageData(pn, size, keyword).then((res) => {
            commit("SET_USER_MANAGE_DATA", res.data.page.records);
            commit("SET_UTOTAL", res.data.page.total);
        });
    },
    // 获取反馈管理表格数据
    getFeedbackManageData({ commit }, { pn, size, keyword }) {
        getFeedbackManageData(pn, size, keyword).then((res) => {
            commit("SET_FEEDBACK_MANAGE_DATA", res.data.page.records);
            commit("SET_FTOTAL", res.data.page.total);
        });
    },
    //获取订单管理表格数据
    getOrderManageData({ commit }, { pn, size, keyword }) {
        getOrderManageData(pn, size, keyword).then((res) => {
            commit("SET_ORDER_MANAGE_DATA", res.data.page.records);
            commit("SET_OTOTAL", res.data.page.total);
        });
    },

    //获取我的房子表格数据
    getMyHouseData({ commit }, { pn, size, keyword }) {
        getMyHouseData(pn, size, keyword).then((res) => {
            commit("SET_MY_HOUSE_DATA", res.data.page.records);
            commit("SET_MHTOTAL", res.data.page.total);
        });
    },

    // 冻结用户
    freezeUser({ _ }, id) {
        freezeUser(id).then((res) => {
            if (res.code == "10") {
                Message({
                    type: "success",
                    message: res.message,
                });
            }else if (res.code == "50") {
                Message({
                    type: "error",
                    message: res.message,
                });
            }
        });
    },
    // 解冻用户
    unfreezeUser({ _ }, id) {
        unfreezeUser(id).then((res) => {
            if (res.code == "10") {
                Message({
                    type: "success",
                    message: res.message,
                });
            }else if (res.code == "50") {
                Message({
                    type: "error",
                    message: res.message,
                });
            }
        });
    },
    //房屋下架
    freezeHouse({ _ }, id) {
        freezeHouse(id).then((res) => {
            if (res.code == "10") {
                Message({
                    type: "success",
                    message: res.message,
                });
            }else if (res.code == "50") {
                Message({
                    type: "error",
                    message: res.message,
                });
            }
        });
    },
    //房屋上架
    unfreezeHouse({ _ }, id) {
        unfreezeHouse(id).then((res) => {
            if (res.code == "10") {
                Message({
                    type: "success",
                    message: res.message,
                });
            }else if (res.code == "50") {
                Message({
                    type: "error",
                    message: res.message,
                });
            }
        });
    },
    //删除反馈
    deleteFeedback({ _ }, id) {
        deleteFeedback(id).then((res) => {
            if (res.code == "10") {
                Message({
                    type: "success",
                    message: res.message,
                });
            }
        });
    },
    //删除订单
    deleteOrder({ _ }, id) {
        deleteOrder(id).then((res) => {
            if (res.code == "10") {
                Message({
                    type: "success",
                    message: res.message,
                });
            }
        });
    },
    //删除房屋
    deleteHouse({ _ }, id) {
        deleteHouse(id).then((res) => {
            if (res.code == "10") {
                Message({
                    type: "success",
                    message: res.message,
                });
            }
        });
    },
    //更新房屋
    updateHouse({ _ }, {
        id,
        type,
        imageUrl,
        address,
        price,
        about }) {
        updateHouse({
            id,
            type,
            imageUrl,
            address,
            price,
            about
        }).then((res) => {
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

};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
