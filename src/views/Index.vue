<template>
  <div class="index">
      <router-view class="main-wrapper"></router-view>
    <TabBar/>
  </div>
</template>
<script>
import TabBar from "../components/TabBar.vue";
export default {
  components:{
    TabBar
  },
 
};
</script>


<style scoped>
.index {
  width: 100%;
  height: 100%;
  background: #fff;
}
.main-wrapper {
  height: calc(100% - 45px);
  overflow: hidden;
}
</style>

