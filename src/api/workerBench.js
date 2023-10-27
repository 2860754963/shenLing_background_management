import request from "@/utils/request";
export function getWorkerBenchData() {
  return request({
    url: "/workspace",
    method: "get",
  });
}
