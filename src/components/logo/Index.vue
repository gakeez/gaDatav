<template>
  <svg t="1620873795058" class="ga-logo" viewBox="0 0 1024 1024">
    <path
      id="taobao-logo"
      d="M132.6 639c9.4 0 18.8-3.6 26-10.3l261.8-245.2 148.8 114.3c15.7 11.7 36.8 9.9 50.2-3.6l231.7-234.9v55.6c0 21.1 17 38.1 38.1 38.1s38.1-17 38.1-38.1V160.3c0-11.2-4.5-21.5-13-28.7-8.1-7.2-18.8-10.3-29.6-9L713 141.9c-21.1 2.2-35.9 21.1-33.6 42.1 2.2 21.1 21.1 35.9 42.1 33.6l71.7-8.1L588.4 418 440.1 302.8c-14.8-10.8-35.4-9.4-48.9 2.7L107 573.6c-7.6 6.7-11.7 16.1-12.1 26.4-0.4 10.3 3.1 19.7 10.3 27.3 7.2 7.7 17.1 11.7 27.4 11.7z m789.7 186.5h-9v0.4h-97.7v-372c0-21.1-17-38.1-38.1-38.1s-38.1 17-38.1 38.1v371.6h-100V599.6c0-20.6-17-37.7-38.1-37.7s-38.1 17-38.1 37.7v225.9h-100V541.3c0-21.1-17-38.1-38.1-38.1s-38.1 17-38.1 38.1v284.2H287V658.3c0-20.6-17-37.7-38.1-37.7s-38.1 17-38.1 37.7v167.2H102.1c-21.1 0-38.1 17-38.1 38.1s17 38.1 38.1 38.1h819.8c21.1 0 38.1-17 38.1-38.1s-16.6-38.1-37.7-38.1z"
      class="ga-logo1"
      :stroke="stroke"
      :stroke-width="strokeWidth"
    ></path>
  </svg>
</template>

<script>
import { onMounted } from "vue";
export default {
  name: "gaLogo",
  props: {
    strokeWidth: {
      type: [String, Number],
      default: 1,
    },
    stroke: {
      type: String,
      default: "#000",
    },
  },
  setup() {
    onMounted(() => {
      // 获取最长周长长度
      const path = document.getElementById("taobao-logo");
      const pathLen = path.getTotalLength();
      console.log(pathLen);
    });
  },
};
</script>

<style lang="scss" scoped>
.ga-logo {
  width: 100%;
  height: 100%;
}

.ga-logo1 {
  fill: none;
  animation: ga-logo-animation 8s linear infinite forwards;
}

@keyframes ga-logo-animation {
  0% {
    // stroke-dasharray 使整段线变成虚线的间隔，stroke-dashoffset 是间隔组件偏移，形成描线效果
    stroke-dasharray: 6884;
    stroke-dashoffset: 6884;
  }
  50% {
    stroke-dasharray: 6884;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: 6884;
    stroke-dashoffset: 0;
  }
}
</style>
