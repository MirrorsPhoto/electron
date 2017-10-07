<template>
    <div class="widget_wrap">
        <table>
            <tr v-for="(row, index) in rows" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ row.name }}</td>
                <td>{{ row.value }}</td>
                <td>{{ row.count }}</td>
            </tr>
        </table>
        <button @click.prevent="confirm()">Оплачено</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rows: [],
            summ: 20
        }
    },
    methods: {
        addRow(data) {
            this.rows.push(data)
        },
        confirm() {
            if (this.summ > 0) this.$store.commit('addSale', this.summ)
        }
    },
    mounted() {
        this.$parent.$children
            .filter(({ $refs }) => $refs.widget)
            .forEach(widget => widget.$on('add', this.addRow))
    }
}
</script>
