<template>
  <div class="total-gender">
    <div class="total-gender-wrapper">
      <!-- <div class="total-gender-left">
        <img src="https://www.youbaobao.xyz/datav-res/datav/datav_circle.png" />
      </div> -->
      <div class="total-gender-right">
        <div class="title">男性用户人数</div>
        <div class="sub-title">Number of male users</div>
        <div class="age">
          <count-to :startVal="startMale" :endVal="endMale" :duration="1000" />
          <span class="age-unit">万人</span>
        </div>
      </div>
    </div>
    <div class="total-gender-mid">
      <div class="total-gender-chart" id="total-gender-chart"></div>
    </div>
    <div class="total-gender-wrapper">
      <!-- <div class="total-gender-left">
        <img src="https://www.youbaobao.xyz/datav-res/datav/datav_circle.png" />
      </div> -->
      <div class="total-gender-right">
        <div class="title">女性用户人数</div>
        <div class="sub-title">Number of female users</div>
        <div class="age">
          <count-to
            :startVal="startFemale"
            :endVal="endFemale"
            :duration="1000"
          />
          <span class="age-unit">万人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, getCurrentInstance, nextTick } from "vue";

export default {
  name: "totalGender",
  props: {
    data: Array,
  },
  setup(props) {
    let chart;
    const startMale = ref(0);
    const endMale = ref(0);
    const startFemale = ref(0);
    const endFemale = ref(0);
    const { proxy } = getCurrentInstance();

    const updateChart = () => {
      function createOption() {
        return {
          tooltip: {
            trigger: "item",
            textStyle: {
              fontSize: 28,
            },
            padding: 10,
          },
          series: [
            {
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              labelLine: {
                show: false,
              },
              color: ["#8da9dd", "#467bdb"],
              data: [
                { value: endFemale.value, name: "女性用户" },
                { value: endMale.value, name: "男性用户" },
              ],
            },
          ],
        };
      }

      if (!chart) {
        chart = proxy.echarts.init(
          document.getElementById("total-gender-chart")
        );
      }
      chart.setOption(createOption());
    };

    const update = (newData) => {
      startMale.value = endMale.value;
      endMale.value = newData[0].value;
      startFemale.value = endFemale.value;
      endFemale.value = newData[1].value;
      updateChart();
    };

    onMounted(() => {
      nextTick(() => {
        update(props.data);
      });
      //update(props.data);
    });

    watch(
      () => props.data,
      (newData) => {
        update(newData);
      }
    );
    return {
      startFemale,
      startMale,
      endFemale,
      endMale,
    };
  },
};
</script>

<style lang="scss" scoped>
.total-gender {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background: rgb(43, 44, 46);
  box-sizing: border-box;

  .total-gender-mid {
    width: 200px;
    height: 200px;

    #total-gender-chart {
      width: 100%;
      height: 100%;
    }
  }

  .total-gender-wrapper {
    display: flex;
    width: 320px;

    .total-gender-left {
      img {
        width: 75px;
        height: 75px;
      }
    }

    .total-gender-right {
      margin-left: 40px;

      .title {
        font-size: 32px;
      }

      .sub-title {
        font-size: 16px;
        margin-top: 10px;
      }

      .age {
        font-size: 49px;
        font-family: DIN;
        font-weight: bold;
        margin-top: 10px;

        .age-unit {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
