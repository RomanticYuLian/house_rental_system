import request from "../utils/request";

// 获取用户管理数据（管理员登录）
export function getUserManageData(pn, size, keyword) {
    return request({
        url: `/admin/queryUser/${pn}/${size}`,
        method: "get",
        params: { keyword },
    });
}

// 冻结用户
export function freezeUser(id) {
    return request({
        url: "/admin/freezeUser",
        method: "post",
        params: { id },
    });
}

// 解冻用户
export function unfreezeUser(id) {
    return request({
        url: "/admin/unfreezeUser",
        method: "post",
        params: { id },
    });
}
// 下架
export function freezeHouse(id) {
    return request({
        url: "/admin/freezeHouse",
        method: "post",
        params: { id },
    });
}

// 上架
export function unfreezeHouse(id) {
    return request({
        url: "/admin/unfreezeHouse",
        method: "post",
        params: { id },
    });
}

//反馈管理
export function getFeedbackManageData(pn, size, keyword) {
    return request({
        url: `/feedback/getAllMsg/${pn}/${size}`,
        method: "get",
        params: { keyword },
    });
}
//删除反馈
export function deleteFeedback(id) {
    return request({
        url: "/feedback/removeFeedback",
        method: "post",
        params: { id },
    });
}
//获取订单数据
export function getOrderManageData(pn, size, keyword) {
    return request({
        url: `/orders/getAll/${pn}/${size}`,
        method: "get",
        params: { keyword },
    });
}
//删除订单
export function deleteOrder(id) {
    return request({
        url: "/orders/removeOrder",
        method: "post",
        params: { id },
    });
}

export function getMyHouseData(pn, size, keyword) {
    return request({
        url: `/users/queryMyHouse/${pn}/${size}`,
        method: "get",
        params: { keyword }
    });
}

export function deleteHouse(id) {
    return request({
        url: "/users/deleteHouse",
        method: "post",
        params: { id },
    });
}

export function updateHouse({
    id,
    type,
    imageUrl,
    address,
    price,
    about
}) {
    return request({
        url: "/users/updateHouse",
        method: "post",
        data: {
            id,
            type,
            imageUrl,
            address,
            price,
            about
        },
    });
}