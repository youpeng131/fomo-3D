<template>
    <div class="rank">
        <p-header></p-header>
        <div class="rank-main">
            <ul class="rank-top">
                <li @click="back" class="rank-back">&lt; 返回</li>
                <li class="rank-p"><i></i>名字</li>
                <li class="rank-search">
                    <input type="text" placeholder="搜索">
                </li>
            </ul>

            <div class="table">
                <ul class="thead">
                    <li>用户名</li>
                    <li>持有KEY个数</li>
                    <li>已投EOS数</li>
                    <li>投资次数</li>
                    <li>已分红EOS数</li>
                </ul>
                <ul v-for="i in 10" class="tbody">
                    <li>名字</li>
                    <li>5</li>
                    <li>3</li>
                    <li>5</li>
                    <li>0</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        methods: {
            back() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
        
    .rank-main{
        min-width: 1368px;
        background-color: rgba(0,0,0,0.8);
    }
    .rank-top, .table{
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