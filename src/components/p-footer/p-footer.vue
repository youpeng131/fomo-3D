<template>
    <div class="p-footer">
        <a target="_blank" class="port" href="https://t.me/EOSTUD"></a>
        <a target="_blank" class="github" href="https://github.com/eosstud/grab_the_bench"></a>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .p-footer{
        height: 200px;
        width: 1368px;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        > a{
            display: block;
            width: 40px;
            height: 40px;
            margin: 0 15px;
            &:hover{
                background-position: 0 -40px;
            }
        }
    }
    .port{
        background-image: url('./port.png');
    }
    .github{
        background-image: url('./github.png')
    }
</style>
