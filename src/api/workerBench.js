import request from "@/utils/request";
export function getWorkerBenchData () {
  return request({
    url: "/workspace",
    method: "get",
  });
}
export function getBusinessScope (params) {
  return request({
    url: `/business-hall/scope/${params.id}/${params.type}`,
    method: "get",
  });
}

export function saveBusinessSCope (params) {
  return request({
    url: `/business-hall/scope`,
    method: "post",
    data: params,
  });
}