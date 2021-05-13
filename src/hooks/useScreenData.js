import { ref, onMounted, onUnmounted } from "vue";
//import { screenData } from '../api'

export default function() {
  const todayUser = ref(10000);
  const growthLastDay = ref(10);
  const growthLastMonth = ref(15);

  let task;

  onMounted(() => {
    task = setInterval(() => {
      todayUser.value++;
      growthLastDay.value++;
      growthLastMonth.value++;
    }, 1000);
  });

  onUnmounted(() => {
    task && clearInterval(task);
  });

  return {
    todayUser,
    growthLastDay,
    growthLastMonth,
  };
}
