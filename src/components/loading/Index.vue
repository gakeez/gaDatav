<template>
  <div class="ga-loading">
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 50 50"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle
        cx="25"
        cy="25"
        r="6"
        fill="none"
        stroke-width="3"
        stroke-dasharray="10"
        :stroke="insideColor"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 25 25;360 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="insideColorAnimation"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        />
      </circle>
      <!-- 外圆 -->
      <!-- stroke-dasharray 使圆环断开 周长分四份 -->
      <!-- stroke-linecap 使断开处变圆 -->
      <circle
        cx="25"
        cy="25"
        r="22"
        fill="none"
        stroke-width="3"
        :stroke="outsideColor"
        stroke-dasharray="34"
        stroke-linecap="round"
      >
        <!-- 实现 transform 变换动画效果。这里是旋转 -->
        <!-- attributeName 需要变化的元素属性名称 -->
        <!-- type="rotate" 旋转 -->
        <!-- values可以是一个或多个值。当values的值设置并被识别时，from，to，by的值都会被忽略。values的功能就是实现多点之间动画 -->
        <!-- 这里values="0 25 25;360 25 25"等于from="0 25 25" to="360 25 25"的结合。第一个参数是0和360这里都代表角度，25 25表示xy坐标-->
        <!-- dur有两种值：常规时间值 | “indefinite” -->
        <!-- repeatCount 表示动画执行次数，可以是合法数值或者"indefinite"(动画循环到电脑死机) -->
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 25 25;360 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        />
        <!-- 基础动画元素。实现单属性的动画过渡效果。这里负责变色效果 -->
        <animate
          attributeName="stroke"
          :values="outsideColorAnimation"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        />
      </circle>
      // 内圆
      <circle
        cx="25"
        cy="25"
        r="12"
        fill="none"
        stroke-width="3"
        stroke-dasharray="19"
        :stroke="insideColor"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360 25 25;0 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="insideColorAnimation"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
    <div class="ga-loading-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "GaLoading",
  props: {
    width: {
      type: [Number, String],
      default: 50,
    },
    height: {
      type: [Number, String],
      default: 50,
    },
    outsideColor: {
      type: String,
      default: "#3be6cb",
    },
    insideColor: {
      type: String,
      default: "#02bcfe",
    },
    duration: {
      type: [Number, String],
      default: 2,
    },
  },
  setup(ctx) {
    const outsideColorAnimation = computed(
      () => `${ctx.outsideColor};${ctx.insideColor};${ctx.outsideColor}`
    );
    const insideColorAnimation = computed(
      () => `${ctx.insideColor};${ctx.outsideColor};${ctx.insideColor}`
    );

    return {
      outsideColorAnimation,
      insideColorAnimation,
    };
  },
};
</script>

<style lang="scss" scoped>
.ga-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
