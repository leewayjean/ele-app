<template>
  <div class="location">
    <!-- 提示当前定位 -->
    <p class="tip">当前定位</p>
    <!-- 当前位置信息 -->
    <p class="location-text">
      <i class="iconfont icondizhi"></i>
      {{address}}
    </p>
  </div>
</template>
<script>
export default {
    props:{
        address:{
            type:String,
            default:""
        }
    }
}
</script>


<style scoped>
/* 当前定位 --样式 */
.tip {
  padding: 10px 0;
  font-size: 12px;
  color: #333;
}
/* 地址字体样式 */
.location-text {
  font-size: 14px;
  color: #000;
  font-weight: bold;
  /* 超出省略 */
  max-width: 25em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 地址图标样式 */
.location-text .icondizhi {
  font-size: 12px;
  color: #009eef;
  margin-right: 5px;
}
</style>

