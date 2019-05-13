<template>
  <div class="home">
    <!-- 头部 -->
    <header class="header">
      <!-- 定位地址 -->
      <div class="address-wrap">
        <router-link class="address" tag="div" to="/address">
          <i class="iconfont iconshouhuodizhi"></i>
          <span class="address-text">{{address}}</span>
          <i class="iconfont iconxiala"></i>
        </router-link>
      </div>
      <!-- 搜索框 -->
      <div class="search-wrapper" :class="{is_fixed:isFixed}">
        <div class="search">
          <i class="iconfont iconsousuo"></i>
          <span>搜索商家&nbsp;商家名称</span>
        </div>
      </div>
    </header>
    <!-- 轮播图 -->
    <mt-swipe :auto="3000" class="slider">
      <mt-swipe-item v-for="(imgSrc,index) in swipeImgs" :key="index">
        <img :src="imgSrc" alt="hot">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 分类入口 -->
    <mt-swipe :auto="0" class="entries">
      <mt-swipe-item v-for="(enter,index) in entries" :key="index">
        <div class="slider-item">
          <div class="enter-item" v-for="(item,index) in enter" :key="index">
            <img :src="item.image" alt>
            <span class="enter-name">{{item.name}}</span>
          </div>
        </div>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 推荐商家 -->
    <h3 class="recommend-text">--&nbsp;推荐商家&nbsp;--</h3>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "mint-ui";
export default {
  data() {
    return {
      isFixed: false, //搜索框固定
      offsetTop: 0, //搜索框距离顶部距离
      swipeImgs: [], //轮播图
      entries: [] //分类入口
    };
  },
  computed: {
    // 当前定位地址
    address() {
      if (!this.$store.state.address) {
        return "正在识别地址...";
      } else {
        return this.$store.state.address;
      }
    }
  },
  methods: {
    initHeight() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop > this.offsetTop ? true : false;
    },
    getData() {
      this.axios.get("/api/profile/shopping").then(res => {
        console.log(res);
        this.swipeImgs = res.data.swipeImgs;
        this.entries = res.data.entries;
      });
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
    this.$nextTick(() => {
      this.offsetTop = document.querySelector(".search-wrapper").offsetTop;
    });
  }
};
</script>

<style scoped>
.home {
  height: 120%;
  background: #fff;
}
.header {
  background: #009eef;
}

/* 定位地址 */
.address-wrap {
  padding: 10px 16px;
}
.address {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.address i {
  font-weight: bold;
  color: #fff;
}
.address-text {
  display: inline-block;
  padding-left: 5px;
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  /* 超出省略 */
  max-width: 18em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.address .iconxiala {
  padding-left: 20px;
}
/* 搜索框 */
.search-wrapper {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  background: #009eef;
}
.search {
  text-align: center;
  padding: 10px 0;
  background: #fff;
  font-size: 14px;
  color: #aaa;
  border-radius: 4px;
}
.search .iconfont {
  font-size: 14px;
}
/* 轮播图 */
.slider {
  width: 100%;
  height: 100px;
}
.slider img {
  width: 100%;
  height: 100px;
}

/* 分类入口 */
.entries {
  height: 47.2vw;
  background: #fff;
}
.slider-item {
  background: #fff;
  display: flex;
  flex-wrap: wrap;
}

.slider-item .enter-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 5px 0;
  overflow: hidden;
}
.slider-item img {
  width: 70%;
}
.enter-name {
  font-size: 0.32rem;
  color: #666;
}

/* 推荐商家 */
.recommend-text {
  text-align: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}

/* 搜索框固定样式 */
.is_fixed {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
}
</style>
