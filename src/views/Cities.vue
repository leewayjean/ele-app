<template>
  <div class="cities">
    <!-- 顶部搜索区 -->
    <div class="search-cities">
      <div class="form-group">
        <!-- 输入框 -->
        <p class="search-input-group">
          <i class="iconfont iconsousuo"></i>
          <input type="text" class="search-input" placeholder="输入城市名" v-model="searchCity">
        </p>
        <!-- 取消按钮 -->
        <span class="search-btn" @click="$router.go(-1)">取消</span>
      </div>
      <!-- 当前位置 -->
      <Location :address="address"/>
    </div>
      <div class="city-list" ref="cities" v-show="cities">
        <!-- 全国城市列表 -->
        <ul class="cities-wrapper" v-if="searchCitiesList.length == 0">
          <li v-for="(value,key,index) in cities" :key="index" ref="item">
            <h3 class="city-title">{{key}}</h3>
            <ul>
              <li
                class="city-item"
                v-for="(item,index) in value"
                @click="selectCity(item.name)"
                :key="index"
              >{{item.name}}</li>
            </ul>
          </li>
          <p class="tip">我也是有底线滴~</p>
        </ul>
        <!-- 检索的城市列表 -->
        <ul class="searchCities-list" v-else>
          <li class="city-item" 
          v-for="(city,index) in searchCitiesList" 
          @click="selectCity(city)"
          :key="index">
            {{city}}
          </li>
        </ul>
      </div>
      <!-- 侧边导航栏 -->
    <ul class="sideBar" v-if="searchCitiesList.length<1">
      <li v-for="(key,index) in keys" @click="scrollTo(index)" :key="index">{{key}}</li>
    </ul>
  </div>
</template>
<script>
import Location from "../components/Location.vue";
import BScroll from "better-scroll";
export default {
  name: "cities",
  data() {
    return {
      cities: null, //全国城市，已经按key值排序
      allCities: [], // 所有的城市，没有key
      keys: [], // #,A到Z字母排序,
      BScroll: {}, //better-scroll 实例
      searchCity:"",
      searchCitiesList:[],//检索的城市列表
    };
  },
  watch:{
    searchCity(){
      this.searchCitiesList = this.allCities.filter((city) => {
        return city.indexOf(this.searchCity) !== -1;
      })
    }
  },
  computed: {
    address() {
      return this.$store.state.address;
    }
  },
  components: {
    Location
  },
  methods: {
    // 获取全国城市列表
    getCities() {
      this.axios.get("/api/posts/cities").then(res => {
        let cities = res.data;
        //
        let keys = Object.keys(res.data);
        keys.pop(); //将热门城市删除
        keys.sort(); //A-Z进行排序
        // 储存排序后的key，用于遍历侧边栏
        let newKeys = ["#"];
        keys.forEach(key => {
          newKeys.push(key);
        });
        this.keys = newKeys;
        let citiesArray = [];
        keys.forEach(key => {
          citiesArray.push(cities[key]);
        });
        let newCities = {};
        newCities["热门城市"] = cities["hotCities"];
        for (let i = 0; i < keys.length; i++) {
          newCities[keys[i]] = citiesArray[i];
        }
        // 全国城市，已按key值排序
        this.cities = newCities;
        keys.forEach(key => {
          res.data[key].forEach(item => {
            this.allCities.push(item.name); //全国城市数组
          });
        });
      });
    },
    // 初始化better-scroll 实例
    _initBScroll() {
      this.BScroll = new BScroll(this.$refs.cities, {
        click: true
      });
    },
    // 点击侧边栏滚动到元素
    scrollTo(index) {
      let citiesElemmet = this.$refs.item;
      this.BScroll.scrollToElement(citiesElemmet[index], 200);
    },
    selectCity(city) {
      this.$store.state.city = city;
      this.$router.push("/address");
    }
  },
  created() {
    // 获取全国城市列表
    this.getCities();
    // 异步更新后实例化better-scroll对象
    this.$nextTick(() => {
      this._initBScroll();
    })
  },
};
</script>

<style scoped>
.cities {
  height: calc(100% -45px);
  background: #f1f1f1;
}
.search-cities {
  padding: 12px 16px;
  background: #fff;
}
.form-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.search-input-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 8px;

  flex: 1;
  height: 40px;
  background: #f1f1f1;
  border-radius: 10px;
}
.search-input {
  border: none;
  outline: none;
  background: #f1f1f1;
  text-indent: 0.5em;
}
.search-btn {
  font-size: 12px;
  display: inline-block;
  margin-left: 10px;
  height: 40px;
  line-height: 40px;
  color: #009eef;
}

/* 城市列表 */

.city-list {
  height: 77%;
  background: #fff;
  margin-top: 10px;
  padding: 16px;
  overflow: hidden;
}
.city-title {
  font-size: 14px;
  color: #aaa;
  padding: 15px 0;
}
.city-item {
  font-size: 14px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
/* 热门城市 */
.cities-wrapper li:first-child ul {
  display: flex;
  flex-wrap: wrap;
}
.cities-wrapper li:first-child li {
  width: 30%;
  box-sizing: border-box;
  text-align: center;
  border-radius: 4px;
  background: #f1f1f1;
  margin: 0 10px 10px 0;
}

.sideBar {
  position: fixed;
  right: 0;
  top: 25%;
}
.sideBar li {
  text-align: center;
  font-size: 12px;
  color: #aaa;
}
.tip {
  font-size: 12px;
  color:#aaa;
  text-align: center;
  padding:15px 0;
}
</style>


