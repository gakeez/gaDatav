import { ref, onMounted, onUnmounted } from "vue";
import { screenData, mapScatter } from "../api";

const color = [
  "rgb(116,166,49)",
  "rgb(190,245,99)",
  "rgb(202,252,137)",
  "rgb(251,253,142)",
];

export default function() {
  /* const todayUser = ref(10000);
  const growthLastDay = ref(10);
  const growthLastMonth = ref(15);
  const ageData = ref(ageMockData);
  const averageAge = ref(0);
  const deviceData = ref(deviceMockData);
  const genderData = ref(genderMockData);
  const riderData = ref(riderMockData);
  const hotCategoryData = ref(hotCategoryMockData);
  const headerData = ref(headerMockData);
  const salesListData = ref(salesListMockData);
  const orderMapData = ref(null);
  const realTimeOrderData = ref(realTimeOrderMockData);
  const scheduleViewData = ref(scheduleViewMockData);
  const salesRankData = ref(salesRankMockData); */
  const todayUser = ref(0);
  const growthLastDay = ref(0);
  const growthLastMonth = ref(0);
  const ageData = ref([]);
  const averageAge = ref(0);
  const deviceData = ref({});
  const genderData = ref([]);
  const riderData = ref({});
  const hotCategoryData = ref({});
  const headerData = ref({});
  const realTimeOrderData = ref({ date: [], data: [] });
  const salesListData = ref([]);
  const salesRankData = ref([]);

  let task;

  const getNowTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  };

  // 获取核心指标
  const getKeyValues = ({ key, index }) => {
    const data = headerData.value;
    if (data && data[key]) {
      return +data[key][index].endVal;
    } else {
      return 0;
    }
  };

  const update = () => {
    screenData().then((data) => {
      //console.log(data);
      // 用户总数数据
      todayUser.value = +data.userToday || 0;
      growthLastDay.value = +data.userGrowthLastDay || 0;
      growthLastMonth.value = +data.userGrowthLastMonth || 0;

      // 年龄分布数据
      const _ageData = [];
      //console.log(data.age);
      data.age.forEach((item, index) => {
        if (ageData.value[index]) {
          _ageData.push({
            startValue: ageData.value[index].value,
            value: item.value,
            axis: item.key,
            color: color[index],
          });
        } else {
          _ageData.push({
            startValue: 0,
            value: item.value,
            axis: item.key,
            color: color[index],
          });
        }
      });
      ageData.value = _ageData;
      averageAge.value = +data.averageAge;
      //console.log(ageData.value);

      // 登录设备数据
      deviceData.value = {
        totalDevices: data.totalDevices,
        devices: data.devices,
      };

      // 性别分布
      genderData.value = data.gender;

      // 骑手数据
      riderData.value = data.rider;

      // 热门分类数据
      hotCategoryData.value = data.category;

      // 核心指标数据
      const _headerData = {
        headerData: [
          {
            title: "今日销售额",
            subTitle: "Today's Sales Amount",
            startVal: getKeyValues({ key: "headerData", index: 0 }),
            endVal: data.salesToday,
            img: "https://www.youbaobao.xyz/datav-res/money.png",
          },
          {
            title: "今日订单量",
            subTitle: "Today's Total Orders",
            startVal: getKeyValues({ key: "headerData", index: 1 }),
            endVal: data.orderToday,
            img: "https://www.youbaobao.xyz/datav-res/order.png",
          },
          {
            title: "今日交易用户数",
            subTitle: "Today's Payed Users",
            startVal: getKeyValues({ key: "headerData", index: 2 }),
            endVal: data.orderUser,
            img: "https://www.youbaobao.xyz/datav-res/member.png",
          },
          {
            title: "今日新增用户数",
            subTitle: "Today's New Users",
            startVal: getKeyValues({ key: "headerData", index: 3 }),
            endVal: data.userToday,
            img: "https://www.youbaobao.xyz/datav-res/follow.png",
          },
        ],
        project: [
          {
            title: "转化率",
            value: `${data.covertRate}%`,
            img: "https://www.youbaobao.xyz/datav-res/success.png",
          },
          {
            title: "退单率",
            value: `${data.returnRate}%`,
            img: "https://www.youbaobao.xyz/datav-res/failed.png",
          },
        ],
      };
      headerData.value = _headerData;

      // 实时订单数据
      realTimeOrderData.value = {
        date: [...realTimeOrderData.value.date, getNowTime()],
        data: [...realTimeOrderData.value.data, data.realTimeOrder],
      };

      // 销售列表数据
      salesListData.value = data.areaSales;

      // 区域销售排行数据
      salesRankData.value = data.areaTop;

      // 地图数据
      //orderMapData.value = data.orderMap;
      /* fetch("http://www.youbaobao.xyz/datav-res/datav/map.json")
        .then((response) => response.json())
        .then((data) => {
          orderMapData.value = data;
        }); */
    });
  };

  onMounted(() => {
    update();
    task = setInterval(() => {
      update();
    }, 3000);
  });

  onUnmounted(() => {
    task && clearInterval(task);
  });

  return {
    todayUser,
    growthLastDay,
    growthLastMonth,
    ageData,
    averageAge,
    deviceData,
    genderData,
    riderData,
    hotCategoryData,
    headerData,
    salesListData,
    realTimeOrderData,
    salesRankData,
  };
}

// 动态获取宽高
export function useScreen(id) {
  const width = ref(0);
  const height = ref(0);
  let dom;
  onMounted(() => {
    dom = document.getElementById(id);
    width.value = dom.clientWidth;
    height.value = dom.clientHeight;
  });

  return {
    width,
    height,
  };
}

export function orderMap() {
  const orderMapData = ref(null);

  mapScatter().then((data) => {
    //console.log(data);
    orderMapData.value = data;
  });

  return orderMapData;
}
