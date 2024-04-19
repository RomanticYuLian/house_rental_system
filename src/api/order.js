import request from "../utils/request";

//获取我的订单
export function getMyOrderData(pn, size, keyword) {
    return request({
        url: `/orders/getMyOrder/${pn}/${size}`,
        method: "get",
        params: { keyword },
    });
}
//获取订单详情
export function getOrderDetails(id) {
    return request({
        url: "/orders/getOrderDetails",
        method: "get",
        params: { id },
    });
}

export function payOrder(id) {
    return request({
        url: "/orders/payOrder",
        method: "post",
        params: { id },
    });
}

export function addOrder(houseId) {
    return request({
        url: "/orders/addOrder",
        method: "post",
        params: { houseId },
    });
}