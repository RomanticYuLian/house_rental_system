import request from "../utils/request";

export function addHouse({
    type,
    imageUrl,
    address,
    price,
    about
}) {
    return request({
        url: "/users/addHouse",
        method: "post",
        data: {
            type,
            imageUrl,
            address,
            price,
            about
        },
    });
}