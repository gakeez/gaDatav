import Mock from "mockjs";
import { apiBaseUrl } from "./index";

Mock.mock(apiBaseUrl + "/screen/data", "get", {
  msg: "success",
  data: "success",
  code: 500,
});

Mock.mock(apiBaseUrl + "/test", "get", {
  msg: "success",
  data: "test success",
  code: 500,
});
