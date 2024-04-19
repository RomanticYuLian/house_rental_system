import { Message } from "element-ui";
import {
    getMyFeedback,
    addFeedback
} from "@/api/feedback";

const state = {
    myFeedbackData: [],
    myFeedbackTotal: 0,
};

const mutations = {
    SET_MY_FEEDBACK_DATA(state, payload) {
        state.myFeedbackData = payload;
    },
    SET_MFTOTAL(state, payload) {
        state.myFeedbackTotal = payload;
    },
};

const actions = {
    getMyFeedback({ commit }, { pn, size, keyword }) {
        getMyFeedback(pn, size, keyword).then((res) => {
            commit("SET_MY_FEEDBACK_DATA", res.data.page.records);
            commit("SET_MFTOTAL", res.data.page.total);
        });
    },

    addFeedback({ _ }, content) {
        addFeedback(content).then((res) => {
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
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}