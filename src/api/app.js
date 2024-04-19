import request from "../utils/request";

// 注册
export function toRegister(username, password, telephone, role) {
  return request({
    url: "/users/register",
    method: "post",
    data: {
      username,
      password,
      telephone,
      role
    },
  });
}

// 登录
export function toLogin(loginInfo) {
  return request({
    url: "/users/login",
    method: "post",
    data: loginInfo,
  });
}

//用户首页商品显示
export function homeInitData(pn, size, keyword) {
  return request({
    url: `/users/queryHouse/${pn}/${size}`,
    method: "get",
    params: { keyword }
  });
}

//根据id查房子
export function getHouseById(id) {
  return request({
    url: "/users/getHouseById",
    method: "get",
    params: { id }
  });
}
