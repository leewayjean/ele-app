<template>
  <footer class="tabbar">
    <div class="btn-group">
      <router-link class="btn-item-group" tag="div" to="/home">
        <span class="icon">
          <i class="iconfont iconwarehouse-delivery"></i>
        </span>
        <p class="btn-title">首页</p>
      </router-link>
    </div>
    <div class="btn-group">
      <router-link class="btn-item-group" tag="div" to="/order">
        <span class="icon">
          <i class="iconfont iconcart1"></i>
        </span>
        <p class="btn-title">订单</p>
      </router-link>
    </div>
    <div class="btn-group">
      <router-link class="btn-item-group" tag="div" to="/me">
        <span class="icon">
          <i class="iconfont iconaccount"></i>
        </span>
        <p class="btn-title">我的</p>
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  props:{
    
  }
};
</script>
<style scoped>
@import url("../../public/css/iconfont/iconfont.css");
.tabbar {
  height: 45px;
  background:#fff;
  border:1px solid #eee;
  color:#999;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
}
.btn-item-group{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
.icon {
    margin-bottom: 4px;
}
.icon i{
    font-size: 18px;
}
.btn-title {
    font-size: 11px;
}
.active {
    color:#008de1;
}
</style>


