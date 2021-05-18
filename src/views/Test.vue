<template>
  <order-map :data="data" />
</template>
<script>
//import { ref } from "vue";
import OrderMap from "../components/orderMap/Index";
//import { mapScatter } from "../api";
import { orderMap } from "../hooks/useScreenData";

export default {
  components: {
    OrderMap,
  },

  data() {
    return {
      data: 0,
    };
  },

  mounted() {
    console.log(orderMap());
    this.data = orderMap();
    /* fetch("http://www.youbaobao.xyz/datav-res/datav/map.json")
      .then((response) => response.json())
      .then((data) => {
        this.data = data;
      }); */
  },
};
</script>

<style lang="css" scoped></style>
