<template>
  <div class="address">
    <Header class="header"/>
    <!-- 搜索城市列表 -->
    <div ref="scrollWrapper" class="outWrapper">
      <div class="scroll-wrapper">
        <div class="search-wrappper">
          <!-- 输入部分-->
          <div class="input-wrapper">
            <!-- 选择城市按钮 -->
            <span class="city" @click="$router.push('/citysList')">
              {{city}}
              <i class="iconfont iconxiangxiajiantou"></i>
            </span>
            <!-- 输入框 -->
            <div class="search-input">
              <i class="iconfont iconsousuo"></i>
              <input type="text" placeholder="小区/写字楼/学校等" v-model="searchContent">
            </div>
          </div>
          <!-- 当前位置信息 -->
          <Location :address="address"/>
        </div>
        <!-- 关键词推荐 -->
        <ul class="city-list">
          <li
            class="list-item"
            v-for="(city,index) in locationLists"
            :key="index"
            @click="selectCity(city)"
          >
            <h4>{{city.name}}</h4>
            <p>{{city.district+ city.address}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Location from "../components/Location.vue"
import BScroll from "better-scroll";
export default {
  data() {
    return {
      searchContent: "", //输入内容
      localCity: "",//当前城市定位
      locationLists: [] // 地址列表
    };
  },
  created() {
    this.$nextTick(function() {
      this._initBScroll();
    });
  },
  components: {
    Header,
    Location
  },
  computed: {
    city() {
      var city = this.$store.state.city;
      this.localCity = city;
      return city;
    },
    address() {
      return this.$store.state.address;
    }
  },
  watch: {
    searchContent() {
      var _this = this;
      _this.showCities();
    }
  },
  methods: {
    _initBScroll() {
      var bs = new BScroll(this.$refs.scrollWrapper, {
        click: true
      });
    },
    showCities() {
      var _this = this;
      AMap.plugin("AMap.Autocomplete", function() {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: _this.localCity
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(_this.searchContent, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          _this.locationLists = result.tips;
          console.log(result)
        });
      });
    },
    selectCity(city) {
      console.log(city);
      this.$store.state.address =city.district + city.name;
      this.$router.push("/");
    }
  },
  
};
</script>
<style scoped>
.address {
  font-size: 14px;
  background: #f5f5f5;
}
.header {
  position: absolute;
  z-index: 999;
}
.search-wrappper {
  height: 108px;
  padding: 10px 20px;
  background: #fff;
  box-sizing: border-box;
}
.input-wrapper {
  display: flex;
  align-items: center;
  background: #eee;
  border-radius: 10px;
  height: 40px;
  background: #eee;
}
.input-wrapper .city {
  padding: 0 10px;
  font-size: 14px;
  color: #333;
}
/* 下拉图标 */
.input-wrapper .city i {
  font-size: 9px;
  font-weight: bold;
}
.search-input {
  padding-left: 5px;
}
/* 搜素图标样式 */
.search-input .iconsousuo {
  font-size: 13px;
  color: #000;
  font-weight: bolder;
}
/* 输入框样式 */
.search-input input {
  text-indent: 0.2em;
  border: none;
  box-shadow: none;
  outline: none;
  background: #eee;
}
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
/* 推荐地址样式 */
.city-list {
  margin-top: 15px;
  padding: 0 16px;
  background: #fff;
}
.list-item {
  border-bottom: 1px solid #eee;
  padding: 8px 0;
}
.list-item h4 {
  color: #000;
  font-weight: bold;
  margin-bottom: 5px;
}
.list-item p {
  color: #666;
}
.outWrapper {
  width: 100%;
  height: calc(100% - 45px);
  position: relative;
  top: 45px;
}
</style>


