<template>
  <div class="hot-category">
    <div class="hot-category-wrapper">
      <div class="hot-category-left">
        <div class="title">当前热卖品类</div>
        <div class="sub-title">Hot Categories</div>
      </div>
      <div class="hot-category-right">
        <div class="sub-title">最后更新时间：{{ date }} {{ time }}</div>
      </div>
    </div>
    <div id="hot-category-chart" />
  </div>
</template>

<script>
import {
  watch,
  onMounted,
  onUnmounted,
  getCurrentInstance,
  nextTick,
} from "vue";
import { clock as useClock } from "../../hooks/useClock";

export default {
  name: "HotCategory",
  props: {
    data: Object,
  },
  setup(props) {
    const { time, date } = useClock();
    let chart;
    let task;
    let currentChart = 0;
    const { ctx } = getCurrentInstance();
    const update = () => {
      function createOption() {
        const sourceData = [];
        const { data1, data2 } = props.data;
        if (currentChart === 0) {
          data1.axisX.forEach((axis, index) => {
            sourceData.push([axis, data1.data1[index], data1.data2[index]]);
          });
        } else {
          data2.axisX.forEach((axis, index) => {
            sourceData.push([axis, data2.data1[index], data2.data2[index]]);
          });
        }
        const source = [["指标", "国内", "海外"], ...sourceData];
        return {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          color: ["#3561b2", "#41414180"],
          grid: {
            left: 40,
            right: 0,
            bottom: 30,
            top: 20,
          },
          dataset: {
            source,
          },
          yAxis: {
            type: "value",
            splitLine: {
              lineStyle: {
                type: "dotted",
              },
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#7B8892",
              },
            },
            axisLabel: {
              color: "#626971",
              fontSize: 16,
            },
            axisTick: { show: false },
          },
          xAxis: {
            type: "category",
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
              color: "#626971",
              fontSize: 16,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#7B8892",
              },
            },
          },
          series: [
            {
              type: "bar",
              stack: "total",
              barWidth: 40,
            },
            {
              type: "bar",
              stack: "total",
            },
          ],
        };
      }
      if (!chart) {
        chart = ctx.echarts.init(document.getElementById("hot-category-chart"));
      }
      chart.setOption(createOption());
      currentChart === 0 ? (currentChart = 1) : (currentChart = 0);
    };
    const stop = watch(
      () => props.data,
      () => {
        update();
        task = setInterval(() => {
          update();
        }, 5000);
        stop(); // watch启动setInterval后，关闭watch自身。但task继续运行
      }
    );
    onMounted(() => {
      nextTick(() => {
        update(props.data);
      });
      //update();
    });
    onUnmounted(() => task && clearInterval(task));
    return {
      time,
      date,
    };
  },
};
</script>

<style lang="scss" scoped>
.hot-category {
  width: 100%;
  height: 100%;
  background: rgb(43, 44, 46);
  padding: 20px 40px;
  box-sizing: border-box;

  .hot-category-wrapper {
    display: flex;

    .hot-category-right {
      flex: 1;
      text-align: right;
    }

    .title {
      font-size: 32px;
    }

    .sub-title {
      font-size: 16px;
      margin-top: 10px;
    }
  }

  #hot-category-chart {
    height: 220px;
  }
}
</style>
