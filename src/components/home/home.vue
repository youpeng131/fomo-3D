<template>
    <div class="home">
        <p-header></p-header>
        
        <div class="numWarp">
            <div class="numBox">
                <span v-for="item in nums" :class="['num', 'num_' + item]"></span>
            </div>
            <div class="time">{{time | format}}</div>
        </div>
        
        <div class="main">
            <div class="main_l">
                <div class="submit">
                    <div class="input-box">
                        <input type="number" placeholder="请输入想要投入的KEY数量" />
                        <p>单价: 0.50001</p>
                    </div>
                    <p class="price">
                        <span>KEY总价格:</span>
                        <span>0.500001</span>
                    </p>
                    <a href="javascript:;"></a>
                </div>
            </div>
            <div class="main_r">
                <p class="produce produce1">
                    <span>距离结束所需时间</span>
                    <span>33:33:33</span>
                </p>
                <p class="produce produce2">
                    <span>奖池当前累计资金</span>
                    <span>133,333,333,33</span>
                </p>
                <div class="input-box input-box1">
                    <input type="text" />
                    <a href="javascript:;"></a>
                </div>
                <p class="detail">
                    <span>您目前拥有:<b>5</b><i class="key"></i></span>
                    <span>可提现EOS:<b>5</b><i class="eos"></i></span>
                </p>
                <div class="input-box input-box2">
                    <input type="number" />
                    <a href="javascript:;"></a>
                </div>
                <p class="other">注: 点击提现弹出提现所需合约地址和合约参数</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import dataFormat from '@/common/js/dataFormat'

    export default {
        data() {
            return {
                time: Date.now(),
                num: 0
            }
        },
        computed: {
            nums() {
                var arr = (this.num + '').split('');
                var arr2 = [];
                let len = arr.length;
                for(var i = 0; i < len; i++) {
                    arr2.push(arr[i]);
                    if((len-i-1)%3 === 0 && i !== len - 1) {
                        arr2.push('10');
                    }
                }
                return arr2;
            }
        },
        filters: {
            format(time) {
                return dataFormat(time, 'hh:mm:ss');
            }
        },
        mounted() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.getTime();
                this.getNum();
            }, 1000);
        },
        methods: {
            getTime() {
                this.time = Date.now();
            },
            getNum() {
                this.num += (Math.random() * 3000 | 0);
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .numWarp{
        width: 958px;
        height: 371px;
        margin: 0 auto;
        background-image: url('./images/circle.png');

        .numBox{
            padding-top: 100px;
            height: 110px;
            text-align: center;
            font-size: 0;
            .num{
                display: inline-block;
                width: 60px;
                height: 80px;
                background-image: url('./images/num.png');
                background-repeat: no-repeat;
                transition: 0.6s all;
            }
            positions = 0 -80px -160px -240px -320px -400px -480px -560px -640px -720px -800px
            for position, i in positions{
                .num_{i} {
                    background-position: 0 position
                }
            }
        }
        .time{
            line-height: 70px;
            text-align: center;
            font-size: 36px;
            color: #d9b36f;
        }
    }
    
    .main{
        display: flex;
        justify-content: space-between;
    }
    .main_l{
        border: 1px solid #fff;
        width: 560px;
        padding-bottom: 36px;
        .submit{
            padding: 18px 48px 0 38px;

            > a{
                display: block;
                width: 232px;
                height: 88px;
                margin: 0 auto;
                background-image: url('./images/confirm.png');
                &:hover{
                    background-position: 0 -88px;
                }
                &:active{
                    background-position: 0 -176px;
                }
            }
        }
        .input-box{
            background: url('./images/key.png') no-repeat 0 12px;

            input{
                display: block;
                margin-left: 50px;
                width: 420px;
                height: 60px;
                font-size: 24px;
                color: #fff;
                text-align: center;
                background-color: #141210;
            }
            p{
                font-size: 22px;
                color: #c3bab2;
                text-align: right;
            }
        }
        .price{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 26px 0 38px;
            line-height: 1;
            span{
                &:nth-child(1){
                    font-size: 30px;
                    color: #cbc2b9;
                    margin-right: 25px;
                }
                &:nth-child(2){
                    font-size: 38px;
                    color: #ffe011;
                }
            }
        }
    }
    .main_r{
        width: 731px;
        padding: 0 21px;
        .produce{
            display: flex;
            height: 50px;
            align-items: center;
            justify-content: space-between;
            span{
                display: block;
                &:nth-child(1){
                    font-size: 22px;
                    color: #cbc2b9;
                }
                &:nth-child(2){
                    font-size: 30px;
                }
            }
        }
        .produce1{
            padding-bottom: 3px;
            background: url('./images/line.png') no-repeat bottom center;
            span:nth-child(2){
                color: #d9b36f;
            }
        }
        .produce2{
            margin-bottom: 25px;
            span:nth-child(2){
                color: #ffe011;
            }
        }
        .input-box{
            display: flex;
            justify-content: space-between;
            input{
                display: block;
                width: 560px;
                height: 60px;
                color: #fff;
                text-align: center;
                background-color: #141210;
            }
            a{
                display: block;
                width: 176px;
                height: 72px;
                &:hover{
                    background-position: 0 -72px;
                }
                &:active{
                    background-position: 0 -144px;
                }
            }
        }
        .input-box1 a{
            background-image: url('./images/search.png');
        }
        .input-box2 input{
            color: #ffe011;
        }
        .input-box2 a{
            background-image: url('./images/get.png');
        }
        .detail{
            display: flex;
            align-items: center;
            height: 60px;
            font-size: 22px;
            color: #cbc2b9;

            span{
                display: block;
                flex: 1;
                b{
                    font-size: 30px;
                    margin: 0 12px;
                    color: #ffe011;
                }
            }
            .key{
                display: inline-block;
                width: 26px;
                height: 27px;
                background-image: url('./images/key.png');
                background-size: 100% 100%;
            }
            .eos{
                display: inline-block;
                width: 70px;
                height: 78px;
                background-image: url('./images/eos.png');
            }
        }
        .other{
            height: 48px;
            line-height: 48px;
            font-size: 18px;
            color: #4f879a;
            text-align: center; 
        }

    }
    .main_l, .main_r{
        border-top: 1px solid #d6c992;
        background-color: #252526;
    }
</style>