<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <!-- {{ categoryList }} -->
            <div class="container" v-show="show" @mouseenter="enterShow" @mouseleave="leaveShow">
                <!-- 事件委托 -->
                <div @mouseleave="leaveIndex"> 
                <h2 class="all">全部商品分类</h2>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <div class="sort">
                    <!-- 利用时间委派+编程式导航实现路由跳转和传递参数 -->
                    <div class="all-sort-list2" @click="goSearch(e)">
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{ cur: currentIndex==index }">
                            <h3 @mouseenter="changeIndex(index)" >
                                <!-- 在每一个列表的a标签添加两个自定义属性用来判断点击的是那个 -->
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category1Id="c2.categoryId">{{ c2.categoryName }}</a>
                                        </dt>
                                        <dd v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                            <em>
                                                <a :data-categoryName="c3.categoryName" :data-category1Id="c3.categoryId">{{ c3.categoryName }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// 节流 按需引入 使用的export default的方式所以不需要加{}号 使用：函数:throttle(function(){函数体},50)
// import throttle from 'lodash/throttle';

export default {
    name: 'TypeNav',

    data() {
        return {
            currentIndex: -1,
            show: true,
        };
    },
    
    // 组件挂载完毕，可以向服务器发请求
    mounted() {
        // 控制全部商品分类是否显示隐藏 如果不是home组件就隐藏
        if(this.$router.path!='/Myhome'){
            this.show = false
        }
    },
    computed: {
        ...mapState({
            // 当使用这个计算属性以后这个函数会立即执行一次
            // 其中state参数是大仓库的数据
            categoryList:(state) => {
                // console.log(state);
                return state.home.categoryList
            }
        })
    },
    methods: {
        changeIndex(index){
            this.currentIndex = index
        },
        leaveIndex(){
            this.currentIndex = -1
        },  

        goSearch(event){
            let element = event.target
            // console.log('::',element);
            let { categoryname, category1id, category2id, category3id } = element.dataset
            // 判断点击的是否有categoryname这个属性 如果有那我点击的一定是a标签
            if (categoryname) {
                // 整理路由跳转参数
                let location = { name: "MySearch" };
                let query = { categoryName: categoryname};
                // 判断是否为1级分类，二级分类，三级分类的a标签
                if (category1id) {
                    query.category1Id = category1id
                } else if(category2id) {
                    query.category2Id = category2id
                } else{
                    query.category3Id = category3id
                }
                // 判断，再路由跳转的时候，如果这里有params参数，就也带过去
                if(this.$route.params) {
                    location.params = this.$route.params
                    // 动态的给location配置对象添加query属性
                    location.query = query
                    // 路由跳转
                    this.$router.push(location)
                }
            }
        },
        // 鼠标经过时展示 全部商品分类 组件
        enterShow() {
            this.show = true
        },
        // 鼠标离开时隐藏 全部商品分类 组件
        leaveShow() {
            // 判断如果是在搜索组件上才会执行隐藏
            if(this.$router.path!= '/Myhome'){
                this.show = false
            }
        }
    },
};
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
            // 在外层需要包裹一个过度标签再添加一个name属性sort
            // 过度动画样式（开始
            .sort-enter {
                height: 0px;
            }
            // 过度动画样式（结束
            .sort-enter-to{
                height: 416px;
            }
            // 定义动画时间，数度
            .sort-enter-active{
                transition: all .4s linear;
            }
            .cur{
                background-color: skyblue;
            }
        }
    }
</style>