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
  created() {
    var _this = this;
    // var map = new AMap.Map();
    AMap.plugin("AMap.Geolocation", function() {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true
        // 设置定位超时时间，默认：无穷大
      });
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);

      function onComplete(data) {
        // data是具体的定位信息
        console.log(data);
      }
      function onError(data) {
        // 定位出错
        AMap.plugin("AMap.CitySearch", ()=>{
          var citySearch = new AMap.CitySearch();
          citySearch.getLocalCity((status, result) =>{
            if (status === "complete" && result.info === "OK") {
              // 查询成功，result即为当前所在城市信息
               _this.$store.state.province = result.province;
              _this.$store.state.city = result.city;
            }
          });
        });
      }
    });
  }
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

