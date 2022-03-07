<template>
  <div class="home bg-gray-100 p-5">
    <div class="flex flex-col py-5 text-lg">
      <p>ラグナロクオリジンの各種計算機を公開する場所です</p>
    </div>

    <About/>
  </div>
</template>

<script>
import About from "@/components/About.vue";

export default {
  name: "Home",

  components: {
    About,
  },
};
</script>
