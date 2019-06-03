<template>
  <div class="index">
      <router-view></router-view>
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
  height:calc(100% - 45px);
  background: #f1f1f1;
}
</style>

