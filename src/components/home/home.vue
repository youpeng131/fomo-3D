<template>
    <div class="home">
        <p-header></p-header>

        <div class="numWarp">
            <div class="numBox">
                <span v-for="item in nums" :class="['num', 'num_' + item]"></span>
            </div>
            <div class="time">倒计时: {{dis_time | format}}</div>
        </div>

        <div class="main">
            <div class="main_l">
                <div class="submit">
                    <div class="input-box">
                        <input v-model="user_num" type="number" placeholder="请输入想要投入的KEY数量" />
                        <p>单价: {{key_price}}</p>
                    </div>
                    <p class="price">
                        <span>KEY总价格:</span>
                        <span>{{all_price}}</span>
                    </p>
                    <a href="javascript:;"></a>
                </div>
            </div>
            <div class="main_r">
                <div class="produce-box">

                    <p class="produce produce1">
                        <span>距离结束所需时间</span>
                        <span>{{dis_time | format}}</span>
                    </p>
                    <p class="produce produce2">
                        <span>奖池当前累计资金</span>
                        <span>{{pots.join('')}}</span>
                    </p>
                    <div class="input-box input-box1">
                        <input type="text" />
                        <a href="javascript:;"></a>
                    </div>
                    <p class="detail">
                        <span><em>您目前拥有:</em><b>5</b><i class="key"></i></span>
                        <span><em>可提现EOS:</em><b>{{balance}}</b><i class="eos"></i></span>
                    </p>
                    <div class="input-box input-box2">
                        <input type="number" />
                        <a href="javascript:;"></a>
                    </div>
                    <p class="other">注: 点击提现弹出提现所需合约地址和合约参数</p>
                </div>

                <div class="intervice">
                    <div>
                        <span>邀请链接：www.wq2131235.com</span><a ref="copy" data-clipboard-text="www.wq2131235.com" href="javascript:;"></a>
                    </div>
                    <span>已邀请: <i>5</i>位</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import dataFormat from '@/common/js/dataFormat'
    import axios from 'axios'
    import Clipboard from 'clipboard'
    import { toDou } from '@/common/js/utils'

    export default {
        data() {
            return {
                time: Date.now(),
                balance: 0,
                pot: 0,
                dis_time: 0,
                end_time: 0,
                key_price: 0,
                user_num: null
            }
        },
        computed: {
            nums() {
                var arr = (this.balance + '').split('');
                var arr2 = [];
                let len = arr.length;
                for(var i = 0; i < len; i++) {
                    arr2.push(arr[i]);
                    if((len-i-1)%3 === 0 && i !== len - 1) {
                        arr2.push('10');
                    }
                }
                return arr2;
            },
            pots() {
                var arr = (this.pot + '').split('');
                var arr2 = [];
                let len = arr.length;
                for(var i = 0; i < len; i++) {
                    arr2.push(arr[i]);
                    if((len-i-1)%3 === 0 && i !== len - 1) {
                        arr2.push(',');
                    }
                }
                return arr2;
            },
            all_price() {
                let user_num = Number(this.user_num);
                user_num = isNaN(user_num) ? 0 : user_num; 
                return (this.key_price * user_num).toFixed(4);
            }
        },
        filters: {
            format(s) {
                if (s > 0) {
                    let h = s / 3600 | 0;
                    s -= h * 3600;
                    let m = s / 60 | 0;
                    s -= m * 60 | 0;
                    return toDou(h) + ':' + toDou(m) + ':' + toDou(s);
                } else {
                    return '00:00:00';
                }
            }
        },
        mounted() {
            clearInterval(this.timer);
            
            this.getCounter();
            this.timer = setInterval(() => {
                this.getCounter();
            }, 20000);

            this.$nextTick(() => {
                this.copyLink();
            });

        },
        methods: {
            cutTime() {
                clearInterval(this.cutTimer);
                this.cutTimer = setInterval(() => {
                    let dis_time = (this.end_time - Date.now()/1000) | 0;
                    if (dis_time <= 0) {
                        clearInterval(this.cutTimer);
                    }
                    this.dis_time = dis_time;
                }, 1000);
            },
            getCounter() {
                axios.get('/api/counter').then(res => {
                    let data = res.data;
                    console.log(data)
                    if (data.code == 0) {
                        let { balance, end_time, key_price, pot } = data.data[0]
                        this.balance = Math.round(balance / 10000);
                        this.end_time = end_time;
                        this.dis_time = (end_time - Date.now()/1000) | 0;
                        this.key_price = (key_price / 10000).toFixed(4);
                        this.pot = Math.round(pot / 10000);

                        this.cutTime();
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    }
                });
            },
            copyLink() {
                var copy = new Clipboard(this.$refs.copy);
                copy.on('success',()=>{
                    this.$message({
                        showClose: true,
                        message: "邀请链接已复制",
                        type: 'success'
                    });
                });
                copy.on('error',()=>{
                    this.$message({
                        showClose: true,
                        message: "复制失败，请手动复制",
                        type: 'error'
                    });
                });
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .home{
        width: 1368px;
        margin: 0 auto;
    }

    .numWarp{
        height: 340px;
        margin: 0 auto;

        .numBox{
            padding-top: 50px;
            height: 110px;
            text-align: center;
            font-size: 0;
            .num{
                position: relative;
                display: inline-block;
                width: 60px;
                height: 80px;
                background-image: url('./images/num.png');
                background-repeat: no-repeat;
                transition: 0.6s all;

                &:after{
                    content: "";
                    display: block;
                    width: 195px;
                    height: 203px;
                    margin-left: -66px;
                    margin-top: -66px;
                    background: url('./images/num_bg.png');
                }
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
        width: 560px;

        .submit{
            padding: 18px 48px 80px 38px;

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
                color: #ffe011;
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
                font-size: 24px;
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
                display: flex;
                align-items: center;
                b{
                    display: block;
                    font-size: 30px;
                    margin: 0 12px;
                    color: #ffe011;
                }
                em{
                    display: block;
                }

            }
            .key, .eos{
                display: block;
                width: 26px;
                height: 27px;
            }
            .key{
                background-image: url('./images/key.png');
                background-size: 100% 100%;
            }
            .eos{
                position: relative;
                &:after{
                    content: "";
                    display: block;
                    width: 70px;
                    height: 78px;
                    margin-top: -24px;
                    margin-left: -25px;
                    background-image: url('./images/eos.png');
                }

            }
        }
        .other{
            height: 48px;
            line-height: 48px;
            font-size: 18px;
            color: #4f879a;
            text-align: center;
        }

        .intervice{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
            margin-top: 10px;
            height: 50px;
            color: #cbc2b9;
            font-size: 18px;

            > span{
                display: block;
            }
            > div{
                display: flex;
            }
            a{
                margin-left: 10px;
                display: block;
                width: 72px;
                height: 26px;
                background-image: url('./images/copy.png');
                &:hover{
                    background-position: 0 -26px;
                }
                &:active{
                    background-position: 0 -52px;
                }
            }
        }

    }
    .produce-box{
        padding: 0 21px;
    }
    .submit, .produce-box, .intervice{
        background-color: #252526;
    }
    .main_l, .main_r{
        border-top: 1px solid #d6c992;
    }
</style>
