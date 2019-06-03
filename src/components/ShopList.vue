<template>
  <div class="shop" ref="shop">
    <ul class="shop-list">
      <li class="shop-item" v-for="(item,index) in shopData" :key="index">
        <div class="logo">
          <img :src="item.restaurant.image_path" alt>
        </div>
        <div class="shop-info">
          <h3 class="shop-name">{{item.restaurant.name}}</h3>
          <div class="sell-mount">
            <p>月售{{item.restaurant.recent_order_num}}单</p>
            <span class="fengniao-icon">蜂鸟专送</span>
          </div>
          <div class="delivery-info">
            <span
              class="delivery-price"
            >￥{{item.restaurant.float_minimum_order_amount}}起送|配送费{{item.restaurant.float_delivery_fee}}</span>
            <span class="distance-time">1.94km|52分钟</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  // props: {
  //   shopData: Array
  // },
  data(){
    return {
      shopData:[]
    }
  },
  methods: {
    initBScrooll() {
      new BScroll(this.$refs.shop, {
        click: true
      });
    },
    geData() {
      this.axios.post("/api/profile/restaurants/1/10").then(res => {
        console.log(res.data);
        this.shopData = res.data;
      });
    }
  },
  created() {
    this.geData();
    this.$nextTick(() => {
      this.initBScrooll();
    });
  }
};
</script>


<style scoped>
.shop-list {
  background: #fff;
}
.shop-item {
  display: flex;
  padding: 4vw 2.666667vw;
  border-bottom: 0.133333vw solid #eee;
}
.logo {
  width: 65px;
  height: 65px;
  border: 1px solid #eee;
}
.logo img {
  width: 100%;
  height: 100%;
}
.shop-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 2.666667vw;
}
.shop-name {
  color: #333;
  font-size: 0.9rem;
  font-weight: 700;
}
.sell-mount {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #666;
}
.fengniao-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  padding: 2px;
  background: #2395ff;
  color: #fff;
  font-size: 10px;
  box-sizing: border-box;
}
.delivery-info {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #666;
}
</style>
