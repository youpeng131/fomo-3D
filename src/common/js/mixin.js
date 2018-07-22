export const heightMixin = {
    mounted() {
        this.$nextTick(() => {
            this.setHeight();
        })
    },
    activated() {
        this.$nextTick(() => {
            this.setHeight();
        })
    },
    methods: {
        setHeight() {
            var t = this.$refs.header.$el.offsetHeight;
            var H = document.documentElement.offsetHeight;
            var H2 = window.innerHeight;
            if (H < H2) {
                this.$refs.main.style.height = H2 - t + 'px';
            }
        }
    }
}