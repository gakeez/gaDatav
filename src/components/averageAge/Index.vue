<template>
  <div class="average-age">
    <div class="title-wrapper">
      <div class="average-age-left">
        <div class="title">用户年龄分布&平均年龄</div>
        <div class="sub-title">Distribution of Age</div>
      </div>
      <div class="average-age-right">
        <div class="age">
          <count-to
            :start-val="startAge"
            :end-val="avgAge"
            :duration="1000"
            :decimals="2"
          />
          <span class="age-unit">岁</span>
        </div>
      </div>
    </div>
    <div id="average-age-chart">
      <!-- <div id="mycharts"></div> -->
    </div>
    <div class="average-data-wrapper">
      <div class="average-data" v-for="(item, index) in data" :key="index">
        <div class="average-data-value">
          <count-to
            :start-val="item.startValue"
            :end-val="item.value"
            :duration="1000"
          />
        </div>
        <div class="average-data-axis">
          <div class="point" :style="{ background: item.color }" />
          <div class="text">{{ item.axis }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch, onMounted, getCurrentInstance } from "vue";

export default {
  name: "averageAge",
  props: {
    data: Array,
    avgAge: Number,
  },
  setup(props) {
    /* eslint-disable */
    const startAge = ref(0);
    let myChart;
    const data = ["指标"];
    const axis = ["指标"];
    const color = [];
    let max = 0;
    props.data.forEach((item) => {
      data.push(+item.value);
      max += +item.value;
      color.push(item.color);
      axis.push(item.axis);
    });
    const { ctx } = getCurrentInstance();

    const updateChart = () => {
      function createOption() {
        return {
          tooltip: {
            textStyle: {
              fontSize: 28,
            },
            padding: 10,
          },
          grid: {
            height: 40,
            left: "5%",
            right: "3%",
            bottom: 50,
          },
          color,
          dataset: {
            source: [axis, data],
          },
          xAxis: {
            type: "value",
            max,
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: { fontSize: 24 },
            axisLine: {
              lineStyle: {
                color: "#4169e1",
                width: 3,
              },
            },
          },
          yAxis: {
            type: "category",
            show: false,
          },
          series: [
            {
              type: "bar",
              stack: "total",
            },
            {
              type: "bar",
              stack: "total",
            },
            {
              type: "bar",
              stack: "total",
            },
            {
              type: "bar",
              stack: "total",
            },
          ],
        };
      }
      if (!myChart) {
        myChart = ctx.echarts.init(
          document.getElementById("average-age-chart")
        );
      }
      myChart.setOption(createOption());
    };

    const update = (newData) => {
      max = 0;
      for (let i = 0; i < 4; i++) {
        data[i + 1] = +newData[i].value;
        max += +newData[i].value;
      }
      updateChart();
    };

    /* 更新数字数据 */
    watch(
      () => props.avgAge,
      (nextValue, prevValue) => {
        startAge.value = prevValue;
      }
    );
    /* 更新图表数据 */

    watch(
      () => props.data,
      (newData) => {
        //console.log(newData);
        update(newData);
      }
    );

    onMounted(() => {
      update(props.data);
    });
    return {
      startAge,
    };
  },
};
</script>

<style lang="scss" scoped>
.average-age {
  width: 100%;
  height: 100%;
  background: rgb(43, 44, 46);
  padding: 20px 40px;
  box-sizing: border-box;
  .title-wrapper {
    display: flex;
    align-items: center;
    .average-age-left {
      .title {
        font-size: 32px;
      }
      .sub-title {
        font-size: 16px;
        margin-top: 10px;
      }
    }
    .average-age-right {
      flex: 1;
      margin-left: 40px;
      font-weight: bold;
      .age {
        font-size: 68px;
        font-family: DIN;
        .age-unit {
          font-size: 20px;
        }
      }
    }
  }
  #average-age-chart {
    height: 120px;
  }

  .average-data-wrapper {
    display: flex;
    .average-data {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      font-weight: bolder;
      .average-data-value {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      .average-data-axis {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: 5px;
        .point {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .text {
          margin-left: 10px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
