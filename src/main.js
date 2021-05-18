import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCountTo from "vue-count-to2";
import icon from "./components/icon/Icon.vue";

import * as echarts from "echarts/core";
import {
  BarChart,
  PieChart,
  LineChart,
  ScatterChart,
  MapChart,
  EffectScatterChart,
  LinesChart,
} from "echarts/charts";
import {
  TooltipComponent,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  GeoComponent,
  TimelineComponent,
  TitleComponent,
  DataZoomComponent,
  CalendarComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TooltipComponent,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  PieChart,
  LineChart,
  ScatterChart,
  MapChart,
  EffectScatterChart,
  LinesChart,
  GeoComponent,
  TimelineComponent,
  TitleComponent,
  CalendarComponent,
  DataZoomComponent,
  CanvasRenderer,
]);

const app = createApp(App);

app.config.globalProperties.echarts = echarts;

app
  .use(store)
  .use(router)
  .use(VueCountTo)
  .component("icon", icon) // 全局引用icon组件
  .mount("#app");

//app.echarts = echarts;
//app.config.globalProperties.$echarts = echarts;
//app.config.globalProperties.apiBaseUrl = "https://apis.imooc.com"; 挂载到全局的常量
