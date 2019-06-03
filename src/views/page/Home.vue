<template>
  <div class="scroll" ref="scroll">
    <div class="home">
      <!-- 头部 -->
      <header class="header">
        <!-- 定位地址 -->
        <div class="address-wrap">
          <router-link class="address" tag="div" to="/address">
            <i class="iconfont iconshouhuodizhi"></i>
            <p class="address-text">{{address}}</p>
            <i class="iconfont caret-down"></i>
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
      <!-- 筛选 -->
      <div class="filter-wrap" :class="{is_nav_fixed:isNavFixed}">
        <!-- 筛选导航 -->
        <ul class="filter-nav">
          <li
            class="filter-item"
            v-for="(item,index) in navTab"
            :key="index"
            @click="addClass(index)"
            :class="{'isSelected':index == currentIndex}"
          >
            {{item.name}}
            <i :class="item.icon" class="iconfont"></i>
          </li>
        </ul>
        <!-- 筛选选项 -->
        <div class="filter-more">
          <!-- 综合排序 -->
          <ul class="sort-wrap" v-if="currentIndex == 0">
            <li
              class="sort-item"
              v-for="(item,index) in sortBy"
              @click="selectSort(item,index)"
              :class="{isSelect:isClickIndex == index}"
              :key="index"
            >{{item.name}}</li>
          </ul>
          <!-- 条件排序 -->
          <ul v-if="currentIndex == 3" class="screenBy">
            <li v-for="(item,index) in screenBy" :key="index">
              <h3 class="title">{{item.title}}</h3>
              <ul>
                <li v-for="(sortItem,index) in item.data" :key="index" class="sort-item">
                  <i class="sort-icon" :style="{'background-image':`url(${sortItem.icon})`}"></i>
                  {{sortItem.name}}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商店列表 -->
      <ShopList />
      <!-- <div class="filter-mask" 
     @click="goBack"
     v-if="currentIndex == 0 || currentIndex == 3"
      ></div>-->
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { Swipe, SwipeItem } from "mint-ui";
import ShopList from "../../components/ShopList.vue";
export default {
  data() {
    return {
      currentIndex: null,
      isFixed: false, //搜索框固定
      isNavFixed: false, //筛选栏固定
      isClickIndex: 0, // 条件筛选当前索引
      offsetTop: 0, //搜索框距离顶部距离
      navOffsetTop: 0, //筛选栏距离顶部距离
      scrollTop: 0, //页面滚动距离
      swipeImgs: [], //轮播图图片
      entries: [], //分类入口
      navTab: [], //排序导航
      screenBy: [], //更多筛选条件
      sortBy: [], //条件筛选
      shopData: [],
      page: 1, //商店列表的页数
      size: 5, //每页显示的商店数量
      HomeScroll: null,
      posY: 0
    };
  },
  components: {
    ShopList
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
    initBScroll() {
      var HomeScroll = new BScroll(this.$refs.scroll, {
        click: true,
        probeType: 3,
        bounce: {
          top: false,
          bottom: false,
          left: true,
          right: true
        }
      });
      this.HomeScroll = HomeScroll;
      this.HomeScroll.on("scroll", pos => {
        // 取整且取绝对值
        this.posY = Math.abs(Math.round(pos.y));
        this.isFixed = this.posY > this.offsetTop ? true : false;
      });
    },
    // 点击筛选栏搜索框和筛选栏吸顶
    scrollTo() {
      window.scrollTo({
        top: this.navOffsetTop
      });
    },
    // 点击遮罩滚动回原位置
    goBack() {
      this.currentIndex = null;
      window.scrollTo({
        top: 0
      });
    },
    // 筛选导航点击添加样式
    addClass(index) {
      if (index == 0 || index == 3) {
        // this.scrollTo();
      }
      this.currentIndex = index;
    },
    // 点击排序添加选中样式
    selectSort(item, index) {
      this.navTab[0].name = item.name;
      this.isClickIndex = index;
      this.goBack();
    },
    initHeight() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
      this.isFixed = scrollTop > this.offsetTop ? true : false;
      this.isNavFixed = scrollTop > this.navOffsetTop ? true : false;
    },
    // 获取数据
    getData() {
      // 请求轮播图及商品分类入口数据
      this.axios.get("/api/profile/shopping").then(res => {
        this.swipeImgs = res.data.swipeImgs;
        this.entries = res.data.entries;
      });
      // 请求分类筛选数据
      this.axios.get("/api/profile/filter").then(res => {
        this.navTab = res.data.navTab;
        this.sortBy = res.data.sortBy;
        this.screenBy = res.data.screenBy;
      });
      this.axios.post("/api/profile/restaurants/1/10").then(res => {
        console.log(res.data);
        this.shopData = res.data;
      });
    }
  },
  created() {
    this.getData();
    this.$nextTick(() => {
      this.initBScroll();
    });
  },
  mounted() {
    // 监听屏幕滚动事件
    window.addEventListener("scroll", this.initHeight);
    this.$nextTick(() => {
      this.offsetTop = document.querySelector(".search-wrapper").offsetTop;
      this.navOffsetTop =
        document.querySelector(".filter-nav").offsetTop - 53.6 * 2;
    });
  }
};
</script>

<style scoped>
.scroll {
  height: 100%;
  position: relative;
}
.home {
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
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.address i {
  font-weight: bold;
  color: #fff;
}
.address-text {
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
  margin-top: 2.933333vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 5px 0;
  overflow: hidden;
}
.slider-item img {
  width: 60%;
}
.enter-name {
  font-size: 12px;
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
  position: sticky;
  z-index: 999;
  top: 0;
  left: 0;
}
/* 筛选导航栏固定样式 */
.is_nav_fixed {
  position: fixed;
  z-index: 999;
  top: 53.6px;
  left: 0;
}

.filter-wrap {
  width: 100%;
}

/* 筛选导航栏 */
.filter-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 40px;
  background: #fff;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
}
.filter-item {
  font-weight: bold;
  font-size: 0.8333rem;
  color: #98a;
}
.filter-item:first-child i,
.filter-item:last-child i {
  color: #555;
  font-size: 12px;
}

.filter-more {
  position: absolute;
  z-index: 999;
  width: 100%;
}
.sort-wrap {
  background: #fff;
}
.sort-item {
  height: 40px;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  font-size: 14px;
  color: #333;
}
.screenBy {
  padding: 10px;
  background: #fff;
}

.screenBy ul {
  display: flex;
  flex-wrap: wrap;
}
.screenBy .title {
  margin-bottom: 10px;
  font-size: 0.5rem;
  color: #666;
}
.screenBy .sort-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 8px 8px 0;
  width: 30%;
  height: 35px;
  font-size: 0.8rem;
  background: #fafafa;
}
.sort-icon {
  display: inline-block;
  width: 13px;
  height: 13px;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-right: 0.8vw;
}
/* 遮罩层样式 */
.filter-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 55;
}
/* 筛选栏选中样式 */
.isSelected {
  color: #333;
}

.isSelect {
  color: #009eef;
}
</style>
