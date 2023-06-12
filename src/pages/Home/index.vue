<template>
    <div>
        <!-- 三级联动组件全局 -->
        <TypeNav/>
        <ListContainer/>
        <TodayRecommend/>
        <RanK/>
        <FlooR/>
        <FlooR/>
        <BranD/>
    </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import RanK from '@/pages/Home/RanK'
import FlooR from '@/pages/Home/FlooR'
import BranD from '@/pages/Home/BranD'


export default {
    name: 'MyHome',
    data() {
        return {
            
        };
    },
    components: {
        ListContainer,
        TodayRecommend,
        RanK,
        FlooR,
        BranD
    },
    mounted() {
        
    },

    methods: {
        
    },
    
};
</script>

<style lang="less" scoped>

</style>