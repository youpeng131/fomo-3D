<template>
    <div class="help">
        <p-header ref="header"></p-header>
        <div class="help-main" ref="help">
            <ul class="help-top">
                <li @click="back" class="help-back">&lt; 返回</li>
                <li class="help-p">玩法介绍</li>
            </ul>

            <div class="help-say">
                <div class="help-item">
                    <h2>游戏规则</h2>
                    <p><i>1.</i>初始第一把KEY价格为0.5EOS，后续按照0.001EOS递增每把KEY的价格，KEY的数量没有上限。</p>   
                    <p><i>2.</i>游戏倒计时8小时，每买入一把KEY，会增加这一轮游戏倒计时10秒的时间（上限为8小时）。</p>  
                    <p><i>3.</i>持有KEY即享有分红权，拥有的KEY越多，能获取的分红就越多。</p>  
                    <p><i>4.</i>每次用户购买KEY资金的50%进入奖金池，游戏结束后分配给游戏获胜者。剩余50%的EOS将分为两部分，45%按持有KEY数量比例均分给当前时刻所有KEY的持有者（可实时提取），5%作为社区维护资金。</p>   
                    <p><i>5.</i>倒计时结束，最后一个购买一把或以上KEY的用户为最终获胜者，其将赢得奖金池中所有的奖金。</p>
                </div>
                <div class="help-item">
                    <h2>界面说明</h2>
                    <p><i>1.</i>在页面左侧，KEY输入框中输入买入KEY的个数，自动输出KEY总价格，点击提交按钮，页面自动弹出转账合约账户地址。用户在本地钱包中将KEY总价格对应的EOS数量打入合约账户地址即完成购买。</p>
                    <p><i>2.</i>购买完毕后，在页面右侧，EOS账户输入栏中输入用户的EOS账户，可查询当前EOS账户中拥有的KEY个数以及待领取的分红。</p>
                    <p><i>3.</i>点击提现按钮，会弹出提现合约地址及提现所需参数（目前提现操作通过从钱包转出0.0001个EOS至合约账户，即可完成自动提现）。</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        mounted() {
            this.$nextTick(() => {
                this.setHeight();
            })
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            setHeight() {
                var t = this.$refs.header.$el.offsetHeight;
                var H = document.documentElement.scrollHeight;
                var H2 = window.innerHeight;
                if (H < H2) {
                    this.$refs.help.style.height = H2 - t + 'px';
                } 
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .help-main{
        min-width: 1368px;
        background-color: rgba(0,0,0,0.9);
    }
    .help-top,.help-say{
        width: 1368px;
        margin: 0 auto;
    }
    .help-top{
        display: flex;
        align-items: center;
        height: 100px; 
        border-bottom: 1px solid #2b241a;
        line-height: 2;
    }
    .help-back{
        cursor: pointer;
        font-size: 24px;
        color: #cbc2b9;
        margin-left: 27px;
        margin-right: 48px;
    }
    .help-p{
        font-size: 28px;
        color: #ffe430;
    }
    .help-say{
        padding: 0 50px 30px 160px;
        box-sizing: border-box;
    }
    .help-item{
        h2{
            height: 74px;
            line-height: 74px;
            background: url('./fire.png') no-repeat left center;
            font-size: 28px;
            color: #c8a768;
            text-indent: 65px;
        }
        p{
            position: relative;
            padding: 0 90px;
            text-align: justify;
            font-size: 22px;
            line-height: 1.8;
            color: #cbc2b9;
            i{
                position: absolute;
                left: 65px;
                top: 0;
            }
        }
    }
</style>