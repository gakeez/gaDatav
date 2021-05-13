/* 容器 */
<template>
  <div id="container" :ref="refName">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted, nextTick } from "vue";
import { debounce } from "../../utils/index";

export default {
  name: "container",
  props: {
    options: Object, // 传入大屏的尺寸，固定宽高比。让一屏显示全部内容
  },
  // 给组合api传入props
  setup(props) {
    const refName = "container";
    // 设置默认宽高
    const width = ref(0);
    const height = ref(0);
    // 可视区域宽高
    const originalWidth = ref(0);
    const originalHeight = ref(0);
    const ready = ref(false);
    let context, dom, observer;

    // 实例被挂载后调用
    onMounted(async () => {
      ready.value = false;
      context = getCurrentInstance().ctx; // 获得当前实例
      await initSize(); // 初始化屏幕参数。这个初始化必须是同步方法才能保证后续方法正常执行
      updateSize(); // 更新尺寸
      updateScale(); // 根据比例缩放
      window.addEventListener("resize", debounce(100, onResize)); // 监听屏幕大小变化，然后onResize。这里使用防抖方法节省资源，缺点是有了100ms的间隔，动画不流畅。根据实际情况使用
      initMutationObserver(); // 处理resize外，还有其他可能变更dom树，所以使用MutationObserver监听dom树变化
      ready.value = true;
    });

    // 初始化，获得宽高
    const initSize = () => {
      return new Promise((resolve) => {
        // 为防止初始化时有其他渲染更新造成冲突，所以使用nextTick延迟到渲染更新完后再执行
        nextTick(() => {
          // 获得目标dom
          dom = context.$refs[refName];
          // 获取大屏的真实尺寸
          if (props.options && props.options.width && props.options.height) {
            width.value = props.options.width;
            height.value = props.options.height;
          } else {
            // 用户没有传入宽高时，则获取dom的宽高
            width.value = dom.clientWidth;
            height.value = dom.clientHeight;
          }

          // 获取可视区域宽高
          if (!originalWidth.value || !originalHeight.value) {
            // 获取用户屏幕宽高
            originalWidth.value = window.screen.width;
            originalHeight.value = window.screen.height;
          }
          // console.log(width.value, height.value, originalWidth.value, originalHeight.value)
          resolve();
        });
      });
    };

    // 更新dom样式宽高
    const updateSize = () => {
      if (width.value && height.value) {
        dom.style.width = `${width.value}px`;
        dom.style.height = `${height.value}px`;
      } else {
        dom.style.width = `${originalWidth.value}px`;
        dom.style.height = `${originalHeight.value}px`;
      }
    };

    // 计算压缩后的尺寸
    const updateScale = () => {
      // 获取真实的视口尺寸
      const currentWidth = document.body.clientWidth;
      const currentHeight = document.body.clientHeight;

      // 获取大屏最终的宽高
      const realWidth = width.value || originalWidth.value;
      const realHeight = height.value || originalHeight.value;

      // console.log(currentWidth, currentHeight)
      // 计算压缩比
      const widthScale = currentWidth / realWidth;
      const heightScale = currentHeight / realHeight;

      // 缩放
      dom && (dom.style.transform = `scale(${widthScale}, ${heightScale})`);
      // 使用transform缩放后会位移在center，所以要css固定位置
    };

    // 重置尺寸，在屏幕放大缩小时，也能保持尺寸比例
    const onResize = async () => {
      await initSize();
      updateScale();
    };

    // 监听dom树变化
    const initMutationObserver = () => {
      const MutationObserver = window.MutationObserver; // 监听dom树变化接口
      observer = new MutationObserver(onResize); // 实例化，onResize作为回调函数

      // 监听dom
      // attributes: true 监听属性
      // attributeFilter 一个属性名数组(不需要指定命名空间),只有该数组中包含的属性名发生变化时才会被观察到
      // attributeOldValue 在attributes属性已经设为true的前提下, 将发生变化的属性节点之前的属性值记录下来(记录到下面MutationRecord对象的oldValue属性中)。这里传入到onResize里
      observer.observe(dom, {
        attributes: true,
        attributeFilter: ["style"],
        attributeOldValue: true,
      });

      // dom树一旦变化，就重置尺寸
    };

    const removeMutationObserver = () => {
      // 消除监听，释放缓存
      if (observer) {
        observer.disconnect();
        observer.takeRecords();
        observer = null;
      }
    };

    // 销毁事件时，解绑
    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
      removeMutationObserver();
    });

    return {
      refName,
      ready,
    };
  },
};
</script>

<style scoped lang="scss">
// 锁定区域
#container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
