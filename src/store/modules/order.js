import { Message } from "element-ui";
import {
    getMyOrderData,
    getOrderDetails,
    payOrder,
    addOrder
} from "@/api/order"
const state = {
    myOrderData: [], // 我的订单管理表格数据
    myOrderTotal: 0,

    orderDetails: {},
};
const mutations = {
    SET_MY_ORDER_DATA(state, payload) {
        state.myOrderData = payload;
    },
    SET_MYTOTAL(state, payload) {
        state.myOrderTotal = payload;
    },

    SET_ORDER_DETAILS(state, payload) {
        state.orderDetails = payload;
    },
};
const actions = {

    getMyOrderData({ commit }, { pn, size, keyword }) {
        getMyOrderData(pn, size, keyword).then((res) => {
            commit("SET_MY_ORDER_DATA", res.data.page.records);
            commit("SET_MYTOTAL", res.data.page.total);
        });
    },

    getOrderDetails({ commit }, id) {
        getOrderDetails(id).then((res) => {
            commit("SET_ORDER_DETAILS", res.data.order);
        })
    },

    payOrder({ _ }, id) {
        payOrder(id).then((res) => {
            if (res.code == "10") {
                Message({
                    type: "success",
                    message: res.message,
                });
            }
        });
    },

    addOrder({ _ }, id) {
        addOrder(id).then((res) => {
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
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};