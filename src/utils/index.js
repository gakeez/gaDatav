export const apiBaseUrl = "https://apis.imooc.com";

// 防抖方法
export function debounce(delay, callback) {
  let task;
  return function() {
    clearTimeout(task); // 移除前一个task
    // delay时间内只能触发一次callback
    task = setTimeout(() => {
      callback.apply(this, arguments);
    }, delay);
  };
  // 逻辑是如果在delay时间内多次触发task，clearTimeout会清除前一个task
  // 所以delay时间内，只会触发一次task
}
