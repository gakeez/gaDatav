<template>
  <div class="order-map">
    <div class="loading" v-if="!ready">加载中...</div>
    <div id="order-map-chart" v-else></div>
  </div>
</template>

<script>
import { ref, nextTick, getCurrentInstance, watch, onMounted } from "vue";
import "echarts-gl";

export default {
  name: "OrderMap",
  props: {
    data: null,
  },
  setup(props) {
    const { ctx } = getCurrentInstance();
    let chart;
    const options = ref({});

    const ready = ref(false);
    /* eslint-disable */
    const genChart = (geoJson) => {
      //console.log("genChart ", JSON.stringify(geoJson));
      const geoGpsMap = {
        "1": [125.8154, 44.2584],
        "2": [125.8154, 44.2584],
        "3": [117.1582, 36.8701],
        "4": [117.1582, 36.8701],
        "5": [103.9526, 30.7617],
        "6": [103.9526, 30.7617],
      };
      const geoCoordMap = {
        江苏: [118.8062, 31.9208],
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        北京市: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891],
      };
      const d1 = {
        江苏: 10041,
        黑龙江: 4093,
        内蒙古: 1157,
        吉林: 4903,
        北京市: 2667,
        辽宁: 8331,
        河北: 23727,
        天津: 681,
        山西: 5352,
        陕西: 38,
        甘肃: 77,
        宁夏: 65,
        青海: 10,
        新疆: 193,
        四川: 309,
        重庆: 77,
        山东: 21666,
        河南: 15717,
        安徽: 15671,
        湖北: 3714,
        浙江: 3141,
        福建: 955,
        江西: 4978,
        湖南: 778,
        贵州: 33,
        云南: 149,
        广东: 1124,
        广西: 125,
        海南: 7,
        上海: 2155,
      };
      const d2 = {
        江苏: 159,
        黑龙江: 5,
        内蒙古: 54,
        吉林: 10,
        北京市: 0,
        辽宁: 0,
        河北: 1679,
        天津: 1,
        山西: 2698,
        陕西: 1744,
        甘肃: 362,
        宁夏: 429,
        青海: 122,
        新疆: 731,
        四川: 3925,
        重庆: 1480,
        山东: 79,
        河南: 1017,
        安徽: 208,
        湖北: 1209,
        浙江: 1418,
        福建: 1237,
        江西: 1004,
        湖南: 1511,
        贵州: 345,
        云南: 1429,
        广东: 2242,
        广西: 2271,
        海南: 59,
        上海: 8,
      };
      const d3 = {
        江苏: 11788,
        黑龙江: 1944,
        内蒙古: 2954,
        吉林: 3482,
        北京市: 1808,
        辽宁: 5488,
        河北: 27035,
        天津: 2270,
        山西: 13623,
        陕西: 4221,
        甘肃: 754,
        宁夏: 1783,
        青海: 91,
        新疆: 1907,
        四川: 4905,
        重庆: 1420,
        山东: 39781,
        河南: 16154,
        安徽: 7914,
        湖北: 6802,
        浙江: 5812,
        福建: 3345,
        江西: 4996,
        湖南: 5627,
        贵州: 1504,
        云南: 2725,
        广东: 6339,
        广西: 1009,
        海南: 0,
        上海: 1988,
      };
      const d4 = {
        江苏: 10041,
        黑龙江: 4093,
        内蒙古: 1157,
        吉林: 4903,
        北京市: 2667,
        辽宁: 8331,
        河北: 23727,
        天津: 681,
        山西: 5352,
        陕西: 38,
        甘肃: 77,
        宁夏: 65,
        青海: 10,
        新疆: 193,
        四川: 309,
        重庆: 77,
        山东: 21666,
        河南: 15717,
        安徽: 15671,
        湖北: 3714,
        浙江: 3141,
        福建: 955,
        江西: 4978,
        湖南: 778,
        贵州: 33,
        云南: 149,
        广东: 1124,
        广西: 125,
        海南: 7,
        上海: 2155,
      };
      const d5 = {
        江苏: 159,
        黑龙江: 5,
        内蒙古: 54,
        吉林: 10,
        北京市: 0,
        辽宁: 0,
        河北: 1679,
        天津: 1,
        山西: 2698,
        陕西: 1744,
        甘肃: 362,
        宁夏: 429,
        青海: 122,
        新疆: 731,
        四川: 3925,
        重庆: 1480,
        山东: 79,
        河南: 1017,
        安徽: 208,
        湖北: 1209,
        浙江: 1418,
        福建: 1237,
        江西: 1004,
        湖南: 1511,
        贵州: 345,
        云南: 1429,
        广东: 2242,
        广西: 2271,
        海南: 59,
        上海: 8,
      };
      const d6 = {
        江苏: 11788,
        黑龙江: 1944,
        内蒙古: 2954,
        吉林: 3482,
        北京市: 1808,
        辽宁: 5488,
        河北: 27035,
        天津: 2270,
        山西: 13623,
        陕西: 4221,
        甘肃: 754,
        宁夏: 1783,
        青海: 91,
        新疆: 1907,
        四川: 4905,
        重庆: 1420,
        山东: 39781,
        河南: 16154,
        安徽: 7914,
        湖北: 6802,
        浙江: 5812,
        福建: 3345,
        江西: 4996,
        湖南: 5627,
        贵州: 1504,
        云南: 2725,
        广东: 6339,
        广西: 1009,
        海南: 0,
        上海: 1988,
      };
      const colors = [
        ["#1DE9B6", "#1DE9B6", "#FFDB5C", "#FFDB5C", "#04B9FF", "#04B9FF"],
        [
          "#1DE9B6",
          "#F46E36",
          "#04B9FF",
          "#5DBD32",
          "#FFC809",
          "#FB95D5",
          "#BDA29A",
          "#6E7074",
          "#546570",
          "#C4CCD3",
        ],
        [
          "#37A2DA",
          "#67E0E3",
          "#32C5E9",
          "#9FE6B8",
          "#FFDB5C",
          "#FF9F7F",
          "#FB7293",
          "#E062AE",
          "#E690D1",
          "#E7BCF3",
          "#9D96F5",
          "#8378EA",
          "#8378EA",
        ],
        [
          "#DD6B66",
          "#759AA0",
          "#E69D87",
          "#8DC1A9",
          "#EA7E53",
          "#EEDD78",
          "#73A373",
          "#73B9BC",
          "#7289AB",
          "#91CA8C",
          "#F49F42",
        ],
      ];
      const colorIndex = 0;
      const year = ["沈阳", "长春", "武汉", "青岛", "长沙", "成都"];
      const mapData = [[], [], [], [], [], []];
      /* 柱子Y名称 */
      const categoryData = []; // 类别数据
      const barData = []; // 柱状图数据
      for (var key in geoCoordMap) {
        mapData[0].push({
          year: "沈阳",
          name: key,
          value: d1[key] / 100,
          value1: d1[key] / 100,
        });
        mapData[1].push({
          year: "长春",
          name: key,
          value: d1[key] / 100,
          value1: d2[key] / 100,
        });
        mapData[2].push({
          year: "武汉",
          name: key,
          value: d3[key] / 100,
          value1: d3[key] / 100,
        });
        mapData[3].push({
          year: "青岛",
          name: key,
          value: d3[key] / 100,
          value1: d4[key] / 100,
        });
        mapData[4].push({
          year: "长沙",
          name: key,
          value: d5[key] / 100,
          value1: d5[key] / 100,
        });
        mapData[5].push({
          year: "成都",
          name: key,
          value: d5[key] / 100,
          value1: d6[key] / 100,
        });
      }

      for (var i = 0; i < mapData.length; i++) {
        mapData[i].sort(function sortNumber(a, b) {
          return a.value - b.value;
        });
        barData.push([]); // barData 柱状图数据
        categoryData.push([]);
        for (var j = 0; j < mapData[i].length; j++) {
          barData[i].push(mapData[i][j].value1); // 获取销售数据
          categoryData[i].push(mapData[i][j].name);
        }
      }

      // 注册地图
      ctx.echarts.registerMap("china", geoJson);

      // 生成散点图数据
      const convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };
      // 生成飞线数据
      const convertToLineData = function(data, gps) {
        const res = [];
        for (let i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var toCoord = geoCoordMap[dataItem.name]; // 终点位置
          var fromCoord = gps; // 起点位置
          //  var toCoord = geoGps[Math.random()*3];
          if (fromCoord && toCoord) {
            res.push([
              {
                coord: fromCoord,
                value: dataItem.value,
              },
              {
                coord: toCoord,
              },
            ]);
          }
        }
        return res;
      };
      // 总配置
      const optionXyMap01 = {
        // 时间线配置
        timeline: {
          data: year, // timeline 数据。Array 的每一项，可以是直接的数值。 如果需要对每个数据项单独进行样式定义，则数据项写成 Object。Object中，value属性为数值。其他属性如下例子，可以覆盖 timeline 中的属性配置
          axisType: "category", // 轴的类型
          autoPlay: true, // 表示是否自动播放
          playInterval: 3000, // 表示播放的速度（跳动的间隔），单位毫秒（ms）
          // 以下都是timeline组件离容器的距离
          left: "10%",
          right: "5%",
          bottom: "3%",
          width: "80%",
          //  height: null,
          // 轴的文本标签
          label: {
            // 一般时

            // 样式
            color: "#ddd",
            /* textStyle: {
              color: "#ddd",
            }, */

            // 是文本高亮的样式，
            /* emphasis: {
              textStyle: {
                color: "#fff",
              },
            }, */
          },
          emphasis: {
            label: {
              textStyle: {
                color: "#fff",
              },
            },
          },
          symbolSize: 10, // timeline标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10
          // 是否显示轴线。可以设置为 false 不显示轴线，则可以做出不同的样式效果。
          lineStyle: {
            color: "#555",
          },
          // 『当前项』（checkpoint）的图形样式。
          checkpointStyle: {
            borderColor: "#777",
            borderWidth: 2,
          },
          // 『控制按钮』的样式。『控制按钮』包括：『播放按钮』、『前进按钮』、『后退按钮』。
          controlStyle: {
            showNextBtn: true, // 是否显示『前进按钮』
            showPrevBtn: true, // 是否显示『后退按钮』

            color: "#666",
            borderColor: "#666",

            /* emphasis: {
              color: "#aaa",
              borderColor: "#aaa",
            }, */
          },
          emphasis: {
            controlStyle: {
              color: "#aaa",
              borderColor: "#aaa",
            },
          },
        },
        // 地图配置
        baseOption: {
          animation: true, // 是否开启动画
          animationDuration: 100, // 初始动画的时长，支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的初始动画效果：
          animationEasing: "cubicInOut", // 初始动画的缓动效果
          animationDurationUpdate: 1000, // 数据更新动画的时长。支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的更新动画效果
          animationEasingUpdate: "cubicInOut", // 数据更新动画的缓动效果
          // 对柱状图组件进行位移
          grid: {
            right: "5%",
            top: "15%",
            bottom: "15%",
            width: "20%",
          },
          tooltip: {
            trigger: "axis", // hover触发器
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
              shadowStyle: {
                color: "rgba(150,150,150,0.1)", // hover颜色
              },
            },
          },
          // 地理坐标系组件
          geo: {
            show: true, // 是否显示地理坐标系组件
            map: "china", // 指定map是china
            roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            zoom: 1.1, // 当前视角的缩放比例
            center: [113.83531246, 34.0267395887], // 当前视角的中心点，用经纬度表示
            // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等

            emphasis: {
              label: {
                show: false, // 是否显示标签
              },
            },
            // 地图区域的多边形 图形样式
            itemStyle: {
              borderColor: "rgba(147, 235, 248, .5)", // 图形的描边颜色
              borderWidth: 1, // 描边线宽
              // 地图区域的颜色
              areaColor: {
                // 径向渐变，前三个参数分别是圆心 x, y 和半径，范围从 0 - 1，相当于在图形包围盒中的百分比
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(147,  235, 248, 0)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 127, 255, .2)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
              shadowColor: "rgba(128, 217, 248, 1)", // 阴影颜色
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2, // 阴影水平方向上的偏移距离。
              shadowOffsetY: 2, // 阴影垂直方向上的偏移距离。
              shadowBlur: 10, // 图形阴影的模糊大小
            },
            emphasis: {
              itemStyle: {
                areaColor: "#389BB7",
                borderWidth: 0,
              },
            },
          },
        },
        // 会动态注入多个option，timelines会自动操作
        options: [],
      };
      // 动态循环添加柱状图配置
      for (var n = 0; n < year.length; n++) {
        optionXyMap01.options.push({
          backgroundColor: "#424446",
          // 标题组件，包含主标题和副标题
          title: [
            // 地图标题
            {
              text: "销售大盘", // 主标题文本，支持使用 \n 换行。
              subtext: "数据由大数据提供", // 副标题文本，支持使用 \n 换行
              left: "2%",
              top: "2%",
              lable: {
                color: "#fff",
                fontSize: 35,
                fontWeight: 700,
              },
            },
            // 柱状图标题
            {
              id: "statistic", // 组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件
              text: year[n] + "销售额统计情况",
              left: "75%",
              top: "8%",
              textStyle: {
                color: "#fff",
                fontSize: 25,
              },
            },
          ],
          xAxis: {
            type: "value", // 坐标轴类型
            // 只在数值轴中（type: 'value'）有效。
            //是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。在双数值轴的散点图中比较有用。
            //在设置 min 和 max 之后该配置项无效。
            scale: true,
            // x 轴的位置
            position: "top",
            // 坐标轴刻度最小值。
            min: 0,
            // 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
            boundaryGap: false,
            // 坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整。
            splitLine: {
              show: false,
            },
            // 坐标轴轴线相关设置
            axisLine: {
              show: false,
            },
            // 坐标轴刻度相关设置
            axisTick: {
              show: false,
            },
            // 坐标轴刻度标签的相关设置
            axisLabel: {
              margin: 2, // 刻度标签与轴线之间的距离
              color: "#aaa",
            },
          },
          yAxis: {
            type: "category",
            //  name: 'TOP 20',
            nameGap: 16, // 坐标轴名称与轴线之间的距离
            // 坐标轴轴线相关设置
            axisLine: {
              show: true, // 是否显示坐标轴轴线
              lineStyle: {
                color: "#ddd",
              },
            },
            // 坐标轴刻度相关设置
            axisTick: {
              show: false,
              lineStyle: {
                color: "#ddd",
              },
            },
            // 坐标轴刻度标签的相关设置
            axisLabel: {
              /* 坐标轴刻度标签的显示间隔，在类目轴中有效。
                 默认会采用标签不重叠的策略间隔显示标签。
                 可以设置成 0 强制显示所有标签。
                 如果设置为 1，表示『隔一个标签显示一个标签』，如果值为 2，表示隔两个标签显示一个标签，以此类推。  
                 可以用数值表示间隔的数据，也可以通过回调函数控制。 */
              interval: 0,
              color: "#ddd",
            },
            // 类目数据
            data: categoryData[n],
          },
          series: [
            {
              // 文字和标志的散点
              name: "light",
              type: "scatter",
              coordinateSystem: "geo",
              data: convertData(mapData[n]),
              symbolSize: function(val) {
                return val[2] / 10;
              },
              label: {
                formatter: "{b}",
                position: "right",
                show: true,
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
              itemStyle: {
                color: colors[colorIndex][n],
              },
            },
            {
              type: "map",
              map: "china",
              geoIndex: 0,
              aspectScale: 0.75, // 长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                show: false,
              },
              emphasis: {
                label: {
                  show: false,
                  color: "#fff",
                },
              },
              roam: true,
              itemStyle: {
                areaColor: "#031525",
                borderColor: "#FFFFFF",
              },
              emphasis: {
                itemStyle: {
                  areaColor: "#2B91B7",
                },
              },
              animation: false,
              data: mapData,
            },
            {
              // 地图上的散点图的动画效果
              // name: 'Top 5',
              type: "effectScatter", // 带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出
              coordinateSystem: "geo", // 该系列使用的坐标系，可选。使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
              // 系列中的数据内容数组。数组项通常为具体的数据项
              data: convertData(
                mapData[n]
                  .sort(function(a, b) {
                    return b.value - a.value;
                  })
                  .slice(0, 20)
              ),
              // 标记的大小
              symbolSize: function(val) {
                // 动态设置
                return val[2] / 10;
              },
              showEffectOn: "render", // 配置何时显示特效。'render' 绘制完成后显示特效。
              // 涟漪特效相关配置
              rippleEffect: {
                brushType: "stroke", // 波纹的绘制方式，可选 'stroke' 和 'fill'
              },
              // hoverAnimation: true, // 是否开启 hover的动画效果
              emphasis: {
                scale: true,
              },
              // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
              label: {
                formatter: "{b}", // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行
                position: "right", // 可以通过内置的语义声明位置
                show: true, // 是否显示标签
              },
              // 图形样式
              itemStyle: {
                color: colors[colorIndex][n], // 图形的颜色。 默认从全局调色盘 option.color 获取颜色
                shadowBlur: 10, // 图形阴影的模糊大小。
                shadowColor: colors[colorIndex][n], // 阴影颜色
              },
              zlevel: 1, // 所有图形的 zlevel 值。zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面。
            },
            {
              // 地图飞 线的动画效果
              type: "lines",
              zlevel: 2,
              effect: {
                show: true,
                period: 4, // 箭头指向速度，值越小速度越快
                trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: "arrow", // 箭头图标
                symbolSize: 3, // 图标大小
              },
              // 线的样式
              lineStyle: {
                color: colors[colorIndex][n],
                width: 0.1, // 尾迹线条宽度
                opacity: 0.5, // 尾迹线条透明度
                curveness: 0.3, // 尾迹线条曲直度
              },
              // 飞线数据
              data: convertToLineData(mapData[n], geoGpsMap[n + 1]),
            },
            {
              // 柱状图数据
              zlevel: 1.5,
              type: "bar",
              symbol: "none",
              itemStyle: {
                color: colors[colorIndex][n],
              },
              data: barData[n],
            },
          ],
        });
      }
      if (!chart) {
        chart = ctx.echarts.init(document.getElementById("order-map-chart"));
      }
      chart.setOption(optionXyMap01);
    };
    const update = () => {
      ready.value = true;
      //console.log(props.data);
      nextTick(() => {
        genChart(props.data);
      });
    };

    onMounted(() => {
      update();
    });

    watch(
      () => props.data,
      () => {
        update();
      }
    );

    return {
      ready,
      options,
    };
  },
};
</script>

<style scoped lang="scss">
.order-map {
  width: 100%;
  height: 100%;

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 36px;
    background: rgb(48, 48, 48);
    color: #fff;
  }

  #order-map-chart {
    width: 100%;
    height: 100%;
    /* width: 1400px;
    height: 800px; */
  }
}
</style>
