import request from "../utils/request";

const icode = "60136E793C2E28BB";

export function wordcloud() {
  return request({
    url: "/screen/wordcloud",
    method: "get",
    params: { icode },
  });
}

export function mapScatter() {
  return request({
    url: "/screen/map/scatter",
    method: "get",
  });
}

export function screenData() {
  return request({
    url: "/screen/data",
    method: "get",
  });
}

export function test() {
  return request({
    url: "/test",
    method: "get",
  });
}
