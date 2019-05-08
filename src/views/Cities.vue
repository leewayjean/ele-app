<template>
    <h1>城市列表</h1>
</template>
<script>
export default {
    name:"cities",
    methods:{
        // 获取全国城市列表
        getCities(){
            this.axios
            .get("/api/posts/cities")
            .then((res) => {
                console.log(res);
            })
        }
    },
    created(){
        this.getCities();
    }
}
</script>

