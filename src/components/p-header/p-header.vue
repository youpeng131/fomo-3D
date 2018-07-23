<template>
    <div class="p-header">
        <router-link class="logo" to="/">
            <img src="~@/common/images/logo2.png">
        </router-link>
        <ul class="nav">
            <router-link tag="li" to="/rank">持仓排行</router-link>
            <router-link tag="li" to="/help">玩法介绍</router-link>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .p-header{
        position: relative;
        width: 1368px;
        margin: 0 auto;
        
        .logo{
            position: absolute;
            top: 10px;
            left: 30px;
        }
        .nav{
            overflow: hidden;

            li{
                float: right;
                width: 145px;
                height: 82px;
                line-height: 82px;
                color: #c7b8aa;
                font-size: 24px;
                text-align: center;
                cursor: pointer;
                &:hover,&.router-link-active{
                    color: #d0c0b2;
                    border-bottom: 2px solid #bcaf70;
                }
            }
        }
    }
</style>