<template>
    <div class="page-group">
        <div class="page page-current" id="page-action">
            我是App页面呀
            <router-view transition="fade" transition-mode="out-in" keep-alive></router-view>
        </div>
    </div>
</template>
<script>
export default {
    ready() {

    }, created() { /* let deviceWidth = Math.min(640, document.documentElement.clientWidth) document.documentElement.style.fontSize = `${deviceWidth / 6.4}px`*/ }, data() {
        return {
            isIndex: true
        }
    }, components: {

    }
}
</script>
<style lang="sass" scoped>
[v-cloak] {
    display: none;
}

.fade-transition {
    transition: opacity .3s ease;
}

.fade-enter,
.fade-leave {
    opacity: 0;
}
</style>
