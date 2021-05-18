<template>
  <div class="home">
    <loading v-if="loading">
      <div class="loading-text">数据大屏加载中...</div>
    </loading>
    <container :options="{ width: 3840, height: 2160 }" v-else>
      <div class="header">
        <top-header></top-header>
      </div>
      <div class="separator" />
      <div class="center">
        <div class="left">
          <div class="left1">
            <total-user
              :today-user="todayUser"
              :growth-last-day="growthLastDay"
              :growth-last-month="growthLastMonth"
            ></total-user>
          </div>
          <div class="left2">
            <average-age :data="ageData" :avg-age="averageAge"></average-age>
          </div>
          <div class="left3">
            <total-device :data="deviceData"></total-device>
          </div>
          <div class="left4">
            <total-gender :data="genderData"></total-gender>
          </div>
          <div class="left5">
            <total-rider :data="riderData" />
          </div>
          <div class="left6">
            <hot-category :data="hotCategoryData"></hot-category>
          </div>
        </div>
        <div class="right">
          <div class="right-top1">
            <center-header :data="headerData"></center-header>
          </div>
          <div class="right-top2">
            <transform-category
              :data="['全部', '北京', '上海', '深圳', '杭州', '南京', '武汉']"
            ></transform-category>
          </div>
          <div class="right-bottom">
            <div class="right-left">
              <div class="right-left1">
                <order-map :data="orderMapData"></order-map>
              </div>
              <div class="right-left2">
                <transform-category
                  :data="['订单量', '销售额', '用户数', '退单量']"
                  :color="['#4265a6', '#255cc2']"
                ></transform-category>
              </div>
              <div class="right-left3">
                <real-time-order :data="realTimeOrderData"></real-time-order>
              </div>
              <div class="right-left4">
                <schedule-view></schedule-view>
              </div>
            </div>
            <div class="right-right">
              <div class="right-right1">
                <sales-list :data="salesListData" />
              </div>
              <div class="right-right2">
                <sales-Rank :data="salesRankData"></sales-Rank>
              </div>
            </div>
          </div>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import screenData from "../hooks/useScreenData";
import { orderMap } from "../hooks/useScreenData";
import Container from "../components/container/Index";
import Loading from "../components/loading/Index";
import TopHeader from "../components/topHeader/Index";
import TotalUser from "../components/totalUser/Index";
import AverageAge from "../components/averageAge/Index";
import TotalDevice from "../components/totalDevice/Index";
import TotalGender from "../components/totalGender/Index";
import TotalRider from "../components/totalRider/Index";
import HotCategory from "../components/hotCategory/Index";
import CenterHeader from "../components/centerHeader/Index";
import TransformCategory from "../components/transformCategory/Index";
import SalesList from "../components/salesList/Index";
import OrderMap from "../components/orderMap/Index";
import RealTimeOrder from "../components/realTimeOrder/Index";
import ScheduleView from "../components/scheduleView/Index";
import SalesRank from "../components/salesRank/Index";

export default {
  name: "Home",
  components: {
    Container,
    Loading,
    TopHeader,
    TotalUser,
    AverageAge,
    TotalDevice,
    TotalGender,
    TotalRider,
    HotCategory,
    CenterHeader,
    TransformCategory,
    SalesList,
    OrderMap,
    RealTimeOrder,
    ScheduleView,
    SalesRank,
  },

  setup() {
    const loading = ref(true);
    const orderMapData = orderMap();

    onMounted(() => {
      // 模拟异步加载数据
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    });

    return {
      loading,
      ...screenData(),
      orderMapData,
    };
  },
};
</script>

<style lang="scss">
.home {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgb(29, 29, 29);
  color: #fff;
  font-size: 48px;

  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .header {
      width: 100%;
      height: 167px;
      background: yellow;
    }

    .separator {
      width: 100%;
      height: 10px;
      background: rgb(92, 88, 89);
    }

    .center {
      flex: 1;
      display: flex;
      width: 100%;
      .left {
        flex: 0 0 860px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 860px;
        height: 100%;
        padding-bottom: 20px;
        box-sizing: border-box;
        .left1 {
          height: 300px;
          background: grey;
        }

        .left2 {
          height: 320px;
          background: grey;
        }

        .left3 {
          height: 280px;
          background: grey;
        }

        .left4 {
          height: 230px;
          background: grey;
        }

        .left5 {
          height: 360px;
          background: grey;
        }

        .left6 {
          height: 360px;
          background: grey;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .right-top1 {
          width: 100%;
          height: 206px;
          background: grey;
        }

        .right-top2 {
          width: 100%;
          height: 48px;
          background: grey;
          margin: 10px 0;
        }

        .right-bottom {
          flex: 1;
          display: flex;
          padding-bottom: 20px;

          .right-left {
            flex: 0 0 1917px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 1917px;

            .right-left1 {
              height: 999px;
              background: grey;
            }

            .right-left2 {
              height: 80px;
              background: grey;
            }

            .right-left3 {
              height: 350px;
              background: grey;
            }

            .right-left4 {
              height: 220px;
              background: grey;
            }
          }

          .right-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 10px;
            margin-right: 20px;

            .right-right1 {
              width: 100%;
              height: 999px;
              background: grey;
            }

            .right-right2 {
              flex: 1;
              width: 100%;
              margin-top: 12px;
              background: grey;
            }
          }
        }
      }
    }
  }
}

.loading-text {
  font-size: 20px;
  margin-top: 10px;
}
</style>
