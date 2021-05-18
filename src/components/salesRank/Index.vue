<template>
  <div class="activate-user">
    <div class="title">地区商家销售排行</div>
    <div class="list-wrapper">
      <div class="list-inner" v-for="(item, index) in headerData" :key="index">
        <div class="list">
          <div class="list-title">{{ item.title }}</div>
          <div class="list-separator-wrapper">
            <div class="list-separator" />
          </div>
          <div class="chart-wrapper">
            <div class="img-wrapper">
              <div class="img">
                <icon :name="item.icon" />
              </div>
            </div>
            <div class="chart" :id="`activate-user-chart${index + 1}`" />
          </div>
          <div class="category-wrapper">
            <transform-category
              :data="['商家', '订单数', '销售额']"
              :color="['#3399CC', '#006699']"
            />
          </div>
          <div class="list-content-wrapper">
            <div
              class="list-item-wrapper"
              v-for="(listItem, index) in listData[index].shop"
              :key="index"
            >
              <div class="list-item">{{ listItem.shop }}</div>
              <div class="list-item">{{ listItem.order }}</div>
              <div class="list-item list-item-sales">{{ listItem.sales }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick, onMounted, getCurrentInstance } from "vue";
import TransformCategory from "../transformCategory/Index";

export default {
  name: "SalesRank",
  components: { TransformCategory },
  props: {
    data: Array,
  },
  setup(props) {
    const { ctx } = getCurrentInstance();
    const headerData = ref([]);
    const listData = ref([]);
    let currentIndex = 0;
    const update = () => {
      const currentData = props.data.slice(currentIndex, currentIndex + 3);
      headerData.value = [
        {
          title: currentData[0].city,
          icon: "quanqiukuajing",
        },
        {
          title: currentData[1].city,
          icon: "dicengjiagou",
        },
        {
          title: currentData[2].city,
          icon: "wendingkekao",
        },
      ];
      listData.value = currentData;
      //console.log(currentData);
      function createOption() {
        const data = [];
        data[0] = Math.ceil(Math.random() * 100);
        data[1] = 100 - data[0];
        return {
          color: ["#6699FF", "#4F4F4F"],
          grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          },
          title: {
            text: `${data[0]}%`,
            left: "center",
            top: "60%",
            textStyle: {
              color: "#6699FF",
              fontSize: 18,
              align: "center",
            },
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["70%", "90%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              labelLine: {
                show: false,
              },
              data: [
                {
                  value: data[0],
                  name: "活跃用户",
                },
                {
                  value: data[1],
                  name: "非活跃用户",
                },
              ],
            },
          ],
        };
      }
      nextTick(() => {
        const chart = [];
        headerData.value.forEach((item, index) => {
          const id = `activate-user-chart${index + 1}`;
          chart[index] = ctx.echarts.init(document.getElementById(id));
          chart[index].setOption(createOption());
        });

        if (currentIndex >= props.data.length - 3) {
          currentIndex = 0;
        } else {
          currentIndex++;
        }
      });
    };
    onMounted(update);
    watch(
      () => props.data,
      () => {
        update();
      }
    );
    return {
      headerData,
      listData,
    };
  },
};
</script>

<style lang="scss" scoped>
.activate-user {
  width: 100%;
  height: 100%;
  background: rgb(55, 55, 55);
  padding-right: 20px;
  box-sizing: border-box;

  .title {
    font-size: 36px;
    margin-left: 20px;
    padding: 20px 40px 0;
    box-sizing: border-box;
  }

  .list-wrapper {
    display: flex;
    width: 100%;
    height: 563px;
    margin-top: 20px;
    padding: 0 10px;
    box-sizing: border-box;

    .list-inner {
      flex: 0 0 33.33%;
      width: 33.33%;
      padding: 0 10px;
      box-sizing: border-box;

      .list {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: rgb(45, 45, 45);

        .list-title {
          font-size: 24px;
          padding: 10px 20px;
          box-sizing: border-box;
        }

        .list-separator-wrapper {
          position: relative;
          height: 30px;
          background: rgb(93, 93, 93);

          .list-separator {
            position: absolute;
            top: 7.5px;
            right: 15px;
            width: 15px;
            height: 15px;
            background: rgb(50, 50, 50);
          }
        }

        .chart-wrapper {
          position: relative;
          width: 100%;
          height: 200px;
          margin-top: 20px;

          .img-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;

            .img {
              width: 70px;
              height: 70px;
              margin-top: 10px;
            }
          }

          .chart {
            width: 100%;
            height: 100%;
          }
        }

        .category-wrapper {
          margin-top: 20px;
        }

        .list-content-wrapper {
          flex: 1;
          margin-top: 20px;
          overflow: hidden;
          .list-item-wrapper {
            display: flex;
            height: 33.33%;
            .list-item {
              display: flex;
              justify-content: center;
              flex: 0 0 33.33%;
              width: 33.33%;
              font-size: 28px;
            }
            .list-item-sales {
              color: #6699ff;
            }
          }
        }
      }
    }
  }
}
</style>
