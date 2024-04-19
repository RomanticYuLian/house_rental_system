import request from "../utils/request";

// 获取用户信息
export function getUserInfo() {
  return request({
    url: "/users/getInfo",
    method: "get",
  });
}

// 设置用户信息
export function settingUserInfo(username, telephone) {
  return request({
    url: "/setting/setMessage",
    method: "post",
    data: { username, telephone},
  });
}

// 设置用户头像
export function setHeadImage( imageUrl ) {
  return request({
    url: "/setting/setHeadImage",
    method: "post",
    params: {imageUrl}
  });
}
// 修改密码
export function editPassword( oldPassword, newPassword ) {
    return request({
      url: "/setting/setPassword",
      method: "post",
      params: { oldPassword, newPassword },
    });
  }