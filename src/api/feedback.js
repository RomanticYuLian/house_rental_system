import request from "../utils/request";

export function getMyFeedback(pn, size, keyword) {
    return request({
      url: `/feedback/getMyFeedback/${pn}/${size}`,
      method: "get",
      params: { keyword }
    });
  }
  export function addFeedback(content) {
    return request({
      url: "/feedback/addFeedback",
      method: "post",
      params: { content }
    });
  }