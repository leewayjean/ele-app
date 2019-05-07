<template>
<!-- 组件实现双向数据绑定要注意 -->
  <div class="input-text">
    <div class="input-group" :class="{'isErrorClass':isError}">
      <!-- 输入框 -->
      <input 
      :type="type" 
      :placeholder="placeholder" 
       @input="$emit('input',$event.target.value)"
      :value="value"
      >
      <!-- 获取验证码按钮 -->
      <button
        v-if="btnTitle"
        :disabled="disabled"
        @click="$emit('btnClick')"
      >{{btnTitle}}</button>
    </div>
    <!-- 错误信息 -->
    <p class="error"
    v-if="error" 
    >{{error}}</p>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: String,
    value:String,
    btnTitle: String,
    disabled:Boolean,
    error:String
  },
  computed:{
      isError(){
        return this.error?true:false;
      }
  }



};
</script>
<style scoped>
.input-text {
  font-size: 14px;
  color: #000;
  margin-top: 20px;
}
/* 输入框组 */
.input-group {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
/* 输入框 */
.input-group input {
  border: none;
  outline: none;
}

/* 获取验证码按钮 */
.input-group button {
  background: #fff;
  border: none;
  outline: none;
}

/* 手机号无效，显示错误信息样式*/
.input-text .error {
  padding-top: 5px;
  font-size: 14px;
  color: red;
}
.isErrorClass{
  border-color:red;
}
</style>


