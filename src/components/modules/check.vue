<template>
    <div class="widget_wrap">
        Тут чек
        <button @click.prevent="confirm()">Оплачено</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            summ: 20
        }
    },
    methods: {
        confirm() {
            if (this.summ > 0) this.$store.commit('addSale', this.summ)
        }
    }
}
</script>
