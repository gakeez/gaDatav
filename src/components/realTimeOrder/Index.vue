<template>
  <div class="real-time-order">
    <div class="real-time-order-left">
      <div class="title">实时订单趋势图</div>
      <div class="sub-title">Number Of Real-time Orders</div>
      <div class="total">
        <count-to
          :start-val="startVal"
          :end-val="endVal"
          :duration="1000"
          separator=","
          autoplay
        />
      </div>
      <div class="tiny-title">周同比增长率</div>
      <div class="percent-text">
        <span class="percent-text-1">
          <count-to
            :start-val="startPercent"
            :end-val="percent"
            :duration="1000"
            :decimals="2"
            suffix="%"
          />
        </span>
      </div>
    </div>
    <div class="real-time-order-right">
      <div id="real-time-order-chart" />
    </div>
  </div>
</template>

<script>
import { watch, onMounted, getCurrentInstance } from "vue";

const kpi = 999999;

export default {
  name: "RealTimeOrder",
  props: {
    data: Object,
  },
  setup(props) {
    const { ctx } = getCurrentInstance();
    let chart;
    const update = () => {
      //console.log(props.data.data);
      function createOption() {
        const option = {
          xAxis: {
            type: "category", // 坐标轴类型
            boundaryGap: false, // 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
            data: props.data.date, // 实时数据
            // 坐标轴轴线相关设置
            axisLine: {
              // 样式
              lineStyle: {
                color: "rgba(200, 200, 200)",
              },
            },
            // 坐标轴刻度标签的相关设置。
            axisLabel: {
              fontSize: 16, // 字体大小
            },
          },
          yAxis: {
            type: "value", // 坐标轴类型。
            // 坐标轴在 grid 区域中的分隔线
            splitLine: {
              lineStyle: {
                color: "rgb(50, 50, 50)",
              },
            },
            // 坐标轴轴线相关设置
            axisLine: {
              lineStyle: {
                color: "rgba(200, 200, 200)",
              },
            },
            // 坐标轴刻度标签的相关设置。
            axisLabel: {
              fontSize: 16,
            },
          },
          // dataZoom 组件 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。
          dataZoom: [
            {
              type: "slider", // 内置型数据区域缩放组件（dataZoomInside）
              start: 0, // 数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
              end: 100, // 数据窗口范围的结束百分比。范围是：0 ~ 100。
              // 两侧缩放手柄的 icon 形状，支持路径字符串
              handleIcon:
                "path:// M 0.0525 0.5656 L 0.0525 0 L -0.0583 0 L -0.0583 0.5656 L -0.2449 0.5656 L -0.2449 1.4344 L -0.0525 1.4344 L -0.0525 2 L 0.0525 2 L 0.0525 1.4344 L 0.2449 1.4344 L 0.2449 0.5656 L 0.0525 0.5656 Z M 0.1399 1.1953 L -0.1458 1.1953 L -0.1458 1.1137 L 0.1399 1.1137 L 0.1399 1.1953 Z M 0.1399 0.8863 L -0.1458 0.8863 L -0.1458 0.8047 L 0.1399 0.8047 L 0.1399 0.8863 Z",
              handleSize: "100%", // 控制手柄的尺寸，可以是像素大小，也可以是相对于 dataZoom 组件宽度的百分比，默认跟 dataZoom 宽度相同
              // 两侧缩放手柄的样式配置
              handleStyle: {
                color: "#a7b7cc",
              },
              textStyle: {
                color: "rgb(200, 200, 200)",
              },
              // 选中范围的填充颜色。
              fillerColor: "rgba(120,126,134,.3)",
              // 数据阴影的样式。
              dataBackground: {
                // 阴影的线条样式
                lineStyle: {
                  color: "grey",
                },
                // 阴影的填充样式
                areaStyle: {
                  color: "gray",
                },
              },
              // 边框颜色。
              borderColor: "rgb(200, 200, 200)",
            },
          ],
          series: [
            {
              name: "模拟数据",
              type: "line",
              smooth: true,
              symbol: "none",
              sampling: "average",
              itemStyle: {
                // graphic 图形相关帮助方法。
                // LinearGradient 渐变内置生成器
                color: new ctx.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#99CCFF",
                  },
                  {
                    offset: 0.5,
                    color: "#3399CC",
                  },
                  {
                    offset: 1,
                    color: "#CCFFFF",
                  },
                ]),
              },
              data: props.data.data,
            },
          ],
          grid: {
            top: 40,
            bottom: 80,
            right: 40,
            left: 80,
          },
        };
        return option;
      }
      if (!chart) {
        chart = ctx.echarts.init(
          document.getElementById("real-time-order-chart")
        );
      }
      chart.setOption(createOption());
    };
    onMounted(update);
    watch(
      () => props.data,
      () => {
        update();
      }
    );
  },
  data() {
    return {
      startVal: 0,
      endVal: 23242,
      startPercent: 0,
      percent: (23242 / kpi) * 100,
    };
  },
};
</script>

<style lang="scss" scoped>
.real-time-order {
  display: flex;
  width: 100%;
  height: 100%;
  background: rgb(28, 28, 28);

  .real-time-order-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 0 0 320px;
    width: 320px;
    padding-left: 40px;
    box-sizing: border-box;

    .title {
      font-size: 32px;
    }

    .sub-title {
      font-size: 16px;
      letter-spacing: 1px;
      margin-top: 10px;
    }

    .total {
      font-family: DIN;
      font-size: 68px;
      font-weight: bolder;
      letter-spacing: 2px;
      padding: 10px 0;
    }

    .tiny-title {
      font-size: 18px;
      color: #fff;
      line-height: 36px;
    }

    .percent-text {
      font-size: 28px;
      font-family: DIN;
      letter-spacing: 2px;

      .percent-text-1 {
        color: #336699;
        font-weight: bolder;
      }
    }
  }

  .real-time-order-right {
    flex: 1;

    #real-time-order-chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
