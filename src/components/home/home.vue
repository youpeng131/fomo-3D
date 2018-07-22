<template>
    <div class="home">
        <p-header></p-header>

        <div class="numWarp">
            <div class="numBox">
                <span v-for="item in nums" :class="['num', 'num_' + item]"></span>
                <span class="eos"></span>
            </div>
            <div class="time">结束倒计时 {{dis_time | format}}</div>
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
                    <a @click="show(0)" href="javascript:;"></a>
                </div>
            </div>
            <div class="main_r">
                <div class="produce-box">
                    <p class="produce">
                        <span>奖池当前累计资金</span>
                        <span>{{pots.join('')}}</span>
                    </p>
                    <div class="input-box">
                        <input v-model="username" placeholder="请输入用户名" type="text" />
                        <a @click="search" href="javascript:;"></a>
                    </div>
                    <div class="detail-box">
                        <div class="detail">
                            <span><em>您目前拥有:</em><b>{{user_keys}}</b><i class="key"></i></span>
                            <span><em>可提现EOS:</em><b>{{user_balance}}</b><i class="eos"></i></span>
                        </div>
                        <a @click="use" href="javascript:;"></a>
                    </div>
                </div>

                <div class="intervice">
                    <span>已邀请: <i>{{invite_account}}</i>位</span>
                    <div>
                        <span>邀请链接：www.wq2131235.com</span><a ref="copy" :data-clipboard-text="invite_link" href="javascript:;"></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="home_tip" v-show="showTip">
            <a href="javascript:;" @click="close" class="close"></a>
            <p v-if="tipStatus==0">钥匙总价格为当前时刻预估价格。<br/>确认投入请从个人钱包往合约账户地址打入相应数量的EOS。<br/>合约账户地址为：</p>
            <p v-if="tipStatus==1">使用投入EOS所用的个人钱包往合约账户地址打入0.0001个EOS即可完成提现。<br/>合约账户地址为：</p>
            <div>studcontract</div>
            <p>注：请勿从交易所往合约账户地址打币，交易所账户无法收取分红。</p>
            <a class="confirm"  @click="close" href="javascript:;"></a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import dataFormat from '@/common/js/dataFormat'
    import qs from 'querystring'
    import axios from 'axios'
    import Clipboard from 'clipboard'
    import { toDou, cookies } from '@/common/js/utils'

    export default {
        data() {
            return {
                time: Date.now(),
                balance: 0,
                pot: 0,
                dis_time: 0,
                end_time: 0,
                key_price: 0,
                user_num: null,
                username: '',
                allUser: [],
                allPlayer: [],
                showTip: false,
                tipStatus: 0,
                invite_account: 0
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
            },
            // 用户
            user_balance() {
                let allUser = this.allUser;
                for(var i = 0; i < allUser.length; i++) {
                    if (allUser[i].username == this.username) {
                        let balance = allUser[i].balance / 10000;
                        balance = balance == 0 ? balance : balance.toFixed(2);
                        return balance;
                    }
                }
                return 0
            },
            user_keys() {
                let allPlayer = this.allPlayer;
                for(var i = 0; i < allPlayer.length; i++) {
                    if (allPlayer[i].player_name == this.username) {
                        let keys = allPlayer[i].keys;
                        keys = keys == 0 ? keys : Number(keys).toFixed(2);
                        return keys;
                    }
                }
                return 0
            },
            invite_link() {
                var href = window.location.href;
                var id = this.username;
                var path = href.substr(href.length-1) == '/' ? '' : '/';
                return href + path + id;
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
            
            var invite_code = this.$route.params.id;
            if (invite_code) {
                cookies.setCookie('invite_code', invite_code, 365);
                this.$router.replace('/home/');
            }

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
            close() {
                this.showTip = false;
            },
            show(status) {
                this.showTip = true;
                this.tipStatus = status;
            },
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
            check() {
                var username = this.username;
                var re = /[^1-5a-z]/;
                if (!username) {
                    this.$message({
                        showClose: true,
                        message: '请输入用户名'
                    });
                    return false
                }
                if (re.test(username) || username.length > 12) {
                    this.$message({
                        showClose: true,
                        message: '用户名只能包含1-5,a-z小写,长度不能大于12位'
                    });
                    return false
                }
                return true
            },
            search() {
                if (this.check() ) {
                    this.getBalance();
                    this.getPlayer();
                }
                
            },
            use() {
                if (this.check() ) {
                    this.show(1)
                }
            },
            getBalance() {
                axios.get('/api/balance').then(res => {
                    let data = res.data;
                    if (data.code == 0){
                        this.allUser = data.data;

                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    }
                });
            },
            getPlayer() {
                axios.get('/api/player').then(res => {
                    let data = res.data;
                    if (data.code == 0){
                        this.allPlayer = data.data;

                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    }
                });
            },
            postUser() {
                let invite_code = cookies.getCookie('invite_code');
                let account = this.username;
                axios.post('/api/user', qs.stringify({
                    account,
                    invite_code
                })).then(res => {
                    let data = res.data;
                    if (data.code == 0){
                        this.invite_account = data.data.invite_account;

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
            display: flex;
            justify-content: center;
            .eos{
                display: block;
                width: 92px;
                height: 110px;
                background-image: url('./images/eos_b.png');
                margin-top: -20px;
            }
            .num{
                position: relative;
                display: block;
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
            padding: 18px 48px 10px 38px;

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
            margin-bottom: 12px;
            height: 88px;
            align-items: center;
            justify-content: space-between;
            span{
                display: block;
                &:nth-child(1){
                    font-size: 32px;
                    color: #cbc2b9;
                }
                &:nth-child(2){
                    font-size: 36px;
                    color: #ffe011;
                }
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
                background-image: url('./images/search.png');
                &:hover{
                    background-position: 0 -72px;
                }
                &:active{
                    background-position: 0 -144px;
                }
            }
        }
        .detail-box{
            display: flex;
            margin-top: 15px;
            justify-content: space-between;
            a{
                display: block;
                width: 176px;
                height: 72px;
                background-image: url('./images/get.png');
                &:hover{
                    background-position: 0 -72px;
                }
                &:active{
                    background-position: 0 -144px;
                }
            }
        }
        .detail{
            display: flex;
            align-items: center;
            height: 60px;
            width: 560px;
            font-size: 18px;
            color: #cbc2b9;

            span{
                display: block;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                b{
                    display: block;
                    font-size: 24px;
                    margin: 0 30px;
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
            height: 58px;
            line-height: 58px;
            font-size: 18px;
            color: #4f879a;
            text-align: center;
        }

        .intervice{
            display: flex;
            align-items: center;
            height: 50px;
            color: #cbc2b9;
            font-size: 18px;

            > span{
                display: block;
                width: 320px;
                text-align: right;
            }
            > div{
                display: flex;
                flex: 1;
                justify-content: flex-end;
                padding-right: 20px;
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

    .home_tip{
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -200px;
        margin-left: -435px;
        width: 870px;
        background-color: #252526;
        box-sinzing: border-sizing;
        padding: 78px 22px 22px;
        p{
            font-size: 24px;
            color: #cbc2b9;
        }
        div{
            font-size: 60px;
            line-height: 110px;
            color: #fff;
            text-align: center;
        }
        p:last-of-type{
            padding-left: 25px;
        }
        .close{
            position: absolute;
            top: 0;
            right: 0;
            display: block;
            width: 80px;
            height: 80px;
            background: url('./images/close.png') no-repeat center center;
            transition: all 0.3s;
            &:hover{
                transform: rotate(90deg);
            }
        }
        .confirm{
            display: block;
            width: 176px;
            height: 72px;
            margin: 30px auto 0;
            background-image: url(./images/confirm2.png);

            &:hover{
                background-position: 0 -72px;
            }
            &:active{
                background-position: 0 -144px;
            }
        }

    }
</style>
