<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    getLocation() {
      var _this = this;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          _this.$store.state.address = data.formattedAddress;
          _this.$store.state.city = data.addressComponent.city;
        }
        function onError(data) {
          console.log("定位失败")
          // 定位出错使用Ip进行定位
          AMap.plugin("AMap.CitySearch", () => {
            var citySearch = new AMap.CitySearch();
            citySearch.getLocalCity((status, result) => {
              if (status === "complete" && result.info === "OK") {
                // 查询成功，result即为当前所在城市信息
                _this.$store.state.address = result.province + result.city;
                _this.$store.state.city = result.city;
              }
            });
          });
        }
      });
    }
  },
  created() {
    this.getLocation();
  }
};
</script>


<style>
* {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>

