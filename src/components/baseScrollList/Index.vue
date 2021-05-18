<template>
  <div class="base-scroll-list" :id="id">
    <div
      class="base-scroll-list-header"
      :style="{
        backgroundColor: actualConfig.headerBg,
        height: `${actualConfig.headerHeight}px`,
        fontSize: `${actualConfig.headerFontSize}px`,
        color: actualConfig.headerColor,
      }"
    >
      <div
        class="header-item base-scroll-list-text"
        v-for="(headerItem, i) in headerData"
        :key="headerItem + i"
        :style="{
          width: `${columnWidths[i]}px`,
          ...headerStyle[i],
        }"
        v-html="headerItem"
        :align="aligns[i]"
      />
    </div>

    <div
      class="base-scroll-list-rows-wrapper"
      :style="{
        height: `${height - actualConfig.headerHeight}px`, // 隐藏多余的数据
      }"
    >
      <div
        class="base-scroll-list-rows"
        v-for="(rowData, index) in currentRowsData"
        :key="rowData.rowIndex"
        :style="{
          height: `${rowHeights[index]}px`,
          lineHeight: `${rowHeights[index]}px`,
          backgroundColor: rowData.rowIndex % 2 === 0 ? rowBg[1] : rowBg[0],
          fontSize: `${actualConfig.rowFontSize}px`,
          color: actualConfig.rowColor,
        }"
      >
        <div
          class="base-scroll-list-columns base-scroll-list-text"
          v-for="(colData, colIndex) in rowData.data"
          :key="colData + colIndex"
          :style="{
            width: `${columnWidths[colIndex]}px`,
            ...rowStyle[colIndex],
          }"
          v-html="colData"
          :align="aligns[colIndex]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { watch, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useScreen } from "../../hooks/useScreenData";
import cloneDeep from "lodash/cloneDeep";
import assign from "lodash/assign";

const defaultConfig = {
  // 标题数据，格式：['a','b','c']
  headerData: [],
  // 标题样式，格式：[{},{},{}]
  headerStyle: [],
  // 行样式
  rowStyle: [],
  // 行背景色
  rowBg: [],
  // 标题的背景色
  headerBg: "rgb(90,90,90)",
  // 标题的高度
  headerHeight: 35,
  // 标题是否展示序号
  headerIndex: false,
  // 序号列标题的内容
  headerIndexContent: "#",
  // 序号列标题的样式
  headerIndexStyle: {
    width: "50px",
  },
  // 序号列的数据内容
  headerIndexData: [],
  // 序号列内容的样式
  rowIndexStyle: {
    width: "50px",
  },
  // 数据项，二维数组
  data: [],
  // 每页显示数据量
  rowNum: 10,
  // 居中方式
  aligns: [],
  headerFontSize: 28,
  rowFontSize: 28,
  headerColor: "#fff",
  rowColor: "#000",
  moveNum: 1, // 移动的位置
  duration: 2000, // 动画间隔
};

export default {
  name: "BaseScrollList",
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const id = `base-scroll-list-${uuidv4()}`;
    const { width, height } = useScreen(id);
    const actualConfig = ref([]);
    const headerData = ref([]);
    const headerStyle = ref([]);
    const rowStyle = ref([]);
    const columnWidths = ref([]);
    const rowBg = ref([]);
    const rowHeights = ref([]);
    const rowsData = ref([]);
    const currentRowsData = ref([]); // 当前展示的行
    const currentIndex = ref(0); // 动画指针
    const rowNum = ref(defaultConfig.rowNum);
    const aligns = ref([]);
    const isAnimationStart = ref(true);
    let avgHeight; // 行高

    const handleHeader = (config) => {
      // 使用深拷贝，避免污染父组件数据
      const _headerData = cloneDeep(config.headerData);
      const _headerStyle = cloneDeep(config.headerStyle);
      const _rowStyle = cloneDeep(config.rowStyle);
      const _rowsData = cloneDeep(config.data);
      const _aligns = cloneDeep(config.aligns);

      if (_headerData.length === 0) {
        return;
      }

      if (config.headerIndex) {
        _headerData.unshift(config.headerIndexContent);
        _headerStyle.unshift(config.headerIndexStyle);
        _rowStyle.unshift(config.rowIndexStyle);
        _rowsData.forEach((rows, index) => {
          // 处理序号列的数据
          if (
            config.headerIndexData &&
            config.headerIndexData.length > 0 &&
            config.headerIndexData[index]
          ) {
            rows.unshift(config.headerIndexData[index]);
          } else {
            rows.unshift(index + 1);
          }
        });
        _aligns.unshift("center");
      }

      // 动态计算header中每一列的宽度
      let usedWidth = 0; // 使用过的宽度
      let usedColumnNum = 0; // 使用过的列项序号
      // 判断是否自定义width
      _headerStyle.forEach((style) => {
        // 如果自定义width，则按照自定义width进行渲染
        if (style.width) {
          usedWidth += +style.width.replace("px", "");
          usedColumnNum++;
        }
      });

      // 动态计算列宽时，使用剩余的宽度除以剩余的列数
      const avgWidth =
        (width.value - usedWidth) / (_headerData.length - usedColumnNum);
      const _columnWidth = new Array(_headerData.length).fill(avgWidth);
      _headerStyle.forEach((style, index) => {
        // 如果自定义width，则按照自定义width进行渲染
        if (style.width) {
          const headerWidth = +style.width.replace("px", "");
          _columnWidth[index] = headerWidth;
        }
      });

      //  为避免页面因响应式数据变更重复渲染，所以统一使用深拷贝后，统一一次性赋值
      columnWidths.value = _columnWidth;
      headerData.value = _headerData;
      headerStyle.value = _headerStyle;
      rowStyle.value = _rowStyle;
      // 行赋值。这样赋值是为了管理好Index，防止重复渲染
      const { rowNum } = config;
      if (_rowsData.length >= rowNum && _rowsData.length < rowNum * 2) {
        // 如果数据长度少于展示长度，则生成两倍数据长度，展示更流畅
        const newRowData = [..._rowsData, ..._rowsData];
        rowsData.value = newRowData.map((item, index) => ({
          data: item,
          rowIndex: index,
        }));
      } else {
        rowsData.value = _rowsData.map((item, index) => ({
          data: item,
          rowIndex: index,
        }));
      }

      aligns.value = _aligns;
      // console.log(_aligns, aligns.value)
    };

    const handleRows = (config) => {
      // 动态计算每行数据的高度
      const { headerHeight } = config;
      rowNum.value = config.rowNum;
      const unusedHeight = height.value - headerHeight;
      // 如果rowNum大于实际数据长度，则以实际数据长度为准
      if (rowNum.value > rowsData.value.length) {
        rowNum.value = rowsData.value.length;
      }
      avgHeight = unusedHeight / rowNum.value;
      rowHeights.value = new Array(rowNum.value).fill(avgHeight);
      // 获取行背景色
      if (config.rowBg) {
        rowBg.value = config.rowBg;
      }
    };

    // 滑动动画
    const startAnimation = async () => {
      if (!isAnimationStart.value) return;
      // 获得配置参数
      const config = actualConfig.value;
      const { rowNum, moveNum, duration } = config;
      const totalLength = rowsData.value.length;

      // 如果数据长度少于展示行数，就不启动动画
      if (totalLength < rowNum) return;
      const index = currentIndex.value; // 拿到指针
      const _rowsData = cloneDeep(rowsData.value); // 把行数据拷贝出来
      // 将数据重新头尾相连
      const rows = _rowsData.slice(index); // 去掉第一个元素
      rows.push(..._rowsData.slice(0, index)); // 第一个元素推入末尾
      currentRowsData.value = rows; // 导出新数组
      // 因为行移动了，行的总高度少了，所以先将行的总高度还原
      rowHeights.value = new Array(totalLength).fill(avgHeight);
      const waitTime = 300;
      if (!isAnimationStart.value) return;

      // 避免动画运动太快，使用延时操作：sleep写法
      // 利用promise+setTimeout，让线程休眠一段时间再运行
      await new Promise((resolve) => setTimeout(resolve, waitTime));

      // 将moveNum（第一行）的行高度设置0
      rowHeights.value.splice(0, moveNum, ...new Array(moveNum).fill(0));
      currentIndex.value += moveNum;

      // 是否到达最后一组数据
      const isLast = currentIndex.value - totalLength;

      // 移动指针
      if (isLast >= 0) {
        currentIndex.value = isLast;
      }
      if (!isAnimationStart.value) return;
      await new Promise((resolve) => setTimeout(resolve, duration - waitTime));
      if (!isAnimationStart.value) return;

      // 执行完后，再次调用自身，使动画循环
      await startAnimation();
    };

    const stopAnimation = () => {
      isAnimationStart.value = false;
    };

    const update = () => {
      stopAnimation();
      // 传进来的config和默认config合并
      // assign 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。
      const _actualConfig = assign(defaultConfig, props.config);

      // 赋值rowsData
      rowsData.value = _actualConfig.data || [];
      handleHeader(_actualConfig);
      handleRows(_actualConfig);
      actualConfig.value = _actualConfig;

      // 展示动画
      isAnimationStart.value = true;
      startAnimation();
    };

    watch(
      () => props.config,
      () => {
        update();
      }
    );

    return {
      id,
      headerData,
      headerStyle,
      rowStyle,
      aligns,
      columnWidths,
      rowHeights,
      rowsData,
      currentRowsData,
      rowBg,
      actualConfig,
      height,
    };
  },
};
</script>

<style lang="scss" scoped>
.base-scroll-list {
  width: 100%;
  height: 100%;

  .base-scroll-list-text {
    /*padding: 0 10px;*/
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }

  .base-scroll-list-header {
    display: flex;
    align-items: center;

    .header-item {
    }
  }

  .base-scroll-list-rows-wrapper {
    overflow: hidden;

    .base-scroll-list-rows {
      display: flex;
      align-items: center;
      transition: all 0.3s linear;

      .base-scroll-list-columns {
        height: 100%;
      }
    }
  }
}
</style>
