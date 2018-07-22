<template>
    <div class="rank">
        <p-header ref="header"></p-header>
        <div class="rank-main" ref="main">
            <ul class="rank-top">
                <li @click="back" class="rank-back">&lt; 返回</li>
                <li class="rank-p"><i></i>名字</li>
                <li class="rank-search">
                    <input type="text" v-model="query" placeholder="搜索">
                </li>
            </ul>

            <div class="table" v-show="searchRank.length">
                <ul class="thead">
                    <li>用户名</li>
                    <li>持有KEY个数</li>
                    <li>已投EOS数</li>
                    <li>已分红EOS数</li>
                </ul>
                <ul v-for="item in curRank" class="tbody">
                    <li>{{item.player_name}}</li>
                    <li>{{item.keys | toFixed2}}</li>
                    <li>{{item.amount | wan}}</li>
                    <li>{{item.total | wan}}</li>
                </ul>
            </div>
            
            <div v-show="searchRank.length > 10" class="page-warp">
                <el-pagination :page-size="10"
                    :pager-count="11"
                    layout="prev, pager, next"
                    :current-page.sync="cur"
                    @current-change="handleCurrentChange"
                    :total="searchRank.length">
                </el-pagination>
            </div>
        </div>
        <p-footer ref="footer"></p-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import { heightMixin } from '@/common/js/mixin'
    export default {
        mixins: [heightMixin],
        data() {
            return {
                rank: [],
                cur: 1,
                query: ''
            }
        },
        computed: {
            curRank() {
                var rank = this.searchRank;
                var start = (this.cur - 1) * 10;
                var end = this.cur * 10;
                var arr = rank.slice(start, end);
                return arr;
            },
            searchRank() {
                let rank = this.rank;
                let query = this.query;
                let arr = [];
                if(!query) {
                    arr = rank;
                } else {
                    arr = rank.filter(item => {
                        let { player_name, keys, amount, total } = item;
                        keys = Number(keys).toFixed(2);
                        amount = (amount/10000).toFixed(2);
                        total = (total/10000).toFixed(2);

                        let all = [player_name, keys, amount, total];
                        for (var i = 0; i < all.length; i++) {
                            if (all[i].indexOf(query) >= 0){
                                return true;
                            }
                        }
                        return false;
                    })
                    if(arr.length > 0) {
                        this.cur = 1;
                    }
                }
                return arr;
            }
        },
        mounted() {
            this.getRank();
        },
        filters: {
            toFixed2(num) {
                return Number(num).toFixed(2);
            },
            wan(num) {
                return (num/10000).toFixed(2);
            }
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            handleCurrentChange(val) {
                this.cur = val;
            },
            getRank() {
                axios.get('/api/rank').then(res => {
                    let data = res.data;
                    if (data.code == 0){
                        this.rank = data.data;
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
        
    .rank-main{
        min-width: 1368px;
        background-color: rgba(0,0,0,0.8);
    }
    .rank-top, .table, .page-warp{
        width: 1368px;
        margin: 0 auto;
    }
    .rank-top{
        display: flex;
        position: relative;
        align-items: center;
        height: 100px; 
        border-bottom: 1px solid #2b241a;
        line-height: 2;
    }
    .rank-back{
        cursor: pointer;
        font-size: 24px;
        color: #cbc2b9;
        margin-left: 27px;
        margin-right: 48px;
    }
    .rank-p{
        display: flex;
        font-size: 28px;
        color: #ffe430;
        align-items: center;
        i{
            display: block;
            width: 39px;
            height: 39px;
            background: url('./images/man.png');
            margin-right: 16px;
        }
    }
    .rank-search{
        position: absolute;
        top: 50%;
        right: 100px;
        margin-top: -25px;
        input{
            display: block;
            width: 560px;
            height: 50px;
            font-size: 24px;
            color: #fff;
            text-align: right;
            box-sizing: border-box;
            padding: 0 22px;
            background-color: rgba(0,0,0,0.5)
        }
    }
    .table{
        box-sizing: border-box;
        padding: 26px 100px;
        li{
            flex: 1;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 24px;
            color: #fff;
        }
    }
    .thead{
        border-top: 1px solid #ae935d;
        background-image: linear-gradient(to bottom, #2d2c2b, #1c1c20);
        display: flex;
    }
    .tbody{
        display: flex;
        border-bottom: 1px solid #493729;
        &:last-child{
            border-bottom: none;
        }
    }
    
</style>

<style lang="stylus" rel="stylesheet/stylus">
    .page-warp{
        display: flex;
        justify-content: flex-end;
        padding: 0 100px 45px;
        box-sizing: border-box;
        .el-pagination{
            color: rgba(255,255,255,0.3);
            .btn-next, .btn-prev{
                background-color: transparent;
                &:hover{
                    color: #fff;
                }
            }
            .el-icon-arrow-right,.el-icon-arrow-left{
                font-size: 24px;
            }
            button{
                &:disabled{
                    background-color: transparent;
                    color: rgba(255,255,255,0.3) !important;
                }
            }
        }
        .el-pager li{
            background: transparent;
            font-size: 24px;
            &:hover,&.active{
                color: #fff;
            }
        }
    }
</style>