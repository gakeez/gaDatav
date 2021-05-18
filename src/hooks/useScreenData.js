import { ref, onMounted, onUnmounted } from "vue";
import { screenData, mapScatter } from "../api";

const color = ["#1c92e2", "#9acff3", "#00bfff", "#1e90ff"];

export default function() {
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
            icon: "renminbi",
          },
          {
            title: "今日订单量",
            subTitle: "Today's Total Orders",
            startVal: getKeyValues({ key: "headerData", index: 1 }),
            endVal: data.orderToday,
            icon: "dingdan",
          },
          {
            title: "今日交易用户数",
            subTitle: "Today's Payed Users",
            startVal: getKeyValues({ key: "headerData", index: 2 }),
            endVal: data.orderUser,
            icon: "maijiagouwuche",
          },
          {
            title: "今日新增用户数",
            subTitle: "Today's New Users",
            startVal: getKeyValues({ key: "headerData", index: 3 }),
            endVal: data.userToday,
            icon: "user",
          },
        ],
        project: [
          {
            title: "转化率",
            value: `${data.covertRate}%`,
            icon: "rongzizijin",
          },
          {
            title: "退单率",
            value: `${data.returnRate}%`,
            icon: "yuanchengchuantou",
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
