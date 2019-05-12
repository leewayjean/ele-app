<template>
  <header class="header">
    <i class="iconfont iconxiangzuojiantou" @click="goToIndex">返回</i>
    <p>选择收货地址</p>
    <i></i>
  </header>
</template>

<script>
export default {
    methods:{
        goToIndex(){
            this.$router.push("/home")
        }
    }
};
</script>
<style scoped>
.header {
  width:100%;
  height: 45px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background: #009eef;
  box-sizing: border-box;
  font-size: 16px;
}
</style>


