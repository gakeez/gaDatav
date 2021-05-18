<template>
  <order-map :data="data" />
</template>
<script>
//import { ref } from "vue";
import OrderMap from "../components/orderMap/Index";

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
    fetch("http://www.youbaobao.xyz/datav-res/datav/map.json")
      .then((response) => response.json())
      .then((data) => {
        this.data = data;
      });
  },
};
</script>

<style lang="css" scoped></style>
