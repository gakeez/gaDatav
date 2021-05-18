<template>
  <div class="schedule-view">
    <div id="schedule-view-chart" />
    <div class="bg1 bg" />
    <div class="bg2 bg" />
  </div>
</template>

<script>
// import Echarts from "echarts";
import { getCurrentInstance } from "vue";

export default {
  name: "ScheduleView",
  mounted() {
    const { ctx } = getCurrentInstance();

    function getVirtualData(year) {
      year = year || "2020";
      const date = +ctx.echarts.number.parseDate(year + "-06-01");
      const end = +ctx.echarts.number.parseDate(+year + 1 + "-12-31");
      const dayTime = 3600 * 24 * 1000;
      const data = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([
          ctx.echarts.format.formatTime("yyyy-MM-dd", time), // 格式化时间
          Math.floor(Math.random() * 10000),
        ]);
      }
      return data;
    }
    const data = getVirtualData(2020);
    //console.log(JSON.stringify(data));
    const option = {
      // 日历坐标系组件
      calendar: [
        {
          top: 30,
          left: 80,
          right: 40,
          bottom: 10,
          range: ["2020-06-01", "2020-12-31"], // 必填，日历坐标的范围 支持多种格式
          // 设置日历坐标分隔线的样式。
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgb(127, 127, 127)",
            },
          },
          // 设置日历坐标中 年的样式
          yearLabel: { show: false },
          // 设置日历坐标中 星期轴的样式
          dayLabel: {
            color: "rgb(127, 127, 127)",
            fontSize: 18,
          },
          // 设置日历坐标中 月份轴的样式
          monthLabel: {
            color: "rgb(127, 127, 127)",
            fontSize: 18,
          },
          // 设置日历格的样式
          itemStyle: {
            color: "rgb(48, 48, 48)",
            borderWidth: 1,
            borderColor: "rgb(48, 48, 48)",
          },
        },
      ],
      series: [
        {
          name: "步数",
          type: "scatter", // 散点
          coordinateSystem: "calendar", // 坐标
          data: data,
          // 标记的大小
          symbolSize: function(val) {
            return val[1] / 600;
          },
          itemStyle: {
            color: "#99CCFF",
          },
        },
        {
          name: "Top 12",
          type: "effectScatter", // 带有涟漪特效动画的散点
          coordinateSystem: "calendar",
          data: data
            .sort(function(a, b) {
              return b[1] - a[1];
            })
            .slice(0, 12),
          symbolSize: function(val) {
            return val[1] / 500;
          },
          showEffectOn: "render", // 配置何时显示特效。
          // 涟漪特效相关配置。
          rippleEffect: {
            brushType: "stroke", // 波纹的绘制方式
          },
          // hoverAnimation: true,
          emphasis: { scale: true },
          itemStyle: {
            color: "#336699",
            shadowBlur: 10,
            shadowColor: "#333",
          },
          zlevel: 1,
        },
      ],
    };

    if (!this.chart) {
      this.chart = ctx.echarts.init(
        document.getElementById("schedule-view-chart")
      );
    }
    this.chart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
.schedule-view {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background: rgb(48, 48, 48);
  padding: 20px 0;
  box-sizing: border-box;

  #schedule-view-chart {
    width: 100%;
    height: 100%;
  }

  .bg {
    width: 100%;
    height: 20px;
    background: #006699;
  }

  .bg1 {
    position: absolute;
    top: 0;
    left: 0;
  }

  .bg2 {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
