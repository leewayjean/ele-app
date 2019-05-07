<template>
    <div class="goods">
        <!-- 头部 -->
        <div class="header">
            <router-link class="address" tag="div" to="/address">
                <i class="iconfont iconshouhuodizhi"></i>
                <span class="address-text">{{address}}</span>
                <i class="iconfont iconxiala"></i>
            </router-link>
            <div class="search">
                <i class="iconfont iconsousuo"></i>
                <span>搜索商家&nbsp;商家名称</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        address(){
            return this.$store.getters.address;
        }
    }
}
</script>

<style scoped>
    .header {
        padding: 16px;
        background:#009eef;
        height: 94px;
        box-sizing: border-box;

    }
    .address i{
        font-weight: bold;
        color:#fff;
    }
    .address-text {
        padding-left: 5px;
        font-size: 14px;
        color: #fff;
        font-weight: bold;
        
    }
    .address .iconxiala {
        padding-left: 20px;
    }
    .search {
        text-align: center;
        padding: 10px 0;
        margin-top: 10px;
        background: #fff;
        font-size: 14px;
        color: #aaa;
        border-radius: 4px;
    }
    .search .iconfont {
        font-size: 14px;
    }
</style>
