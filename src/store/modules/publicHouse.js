import { Message } from "element-ui";

import { addHouse } from "@/api/publicHouse";

const state = {};

const mutations = {};

const actions = {
    addHouse({ _ }, {
        type,
        imageUrl,
        address,
        price,
        about
    }) {
        addHouse({
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

    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};