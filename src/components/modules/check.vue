<template>
    <div class="widget_wrap">
        <table>
            <th>
                <td>№</td>
                <td>Наименование</td>
                <td>Кол-во</td>
                <td>Цена</td>
            </th>
            <tr v-for="(row, index) in rows" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ row.name }}, {{ row.value }}</td>
                <td>{{ row.count }}</td>
                <td>{{ row.price }}</td>
            </tr>
            <tfoot>
                <td>{{ total }}</td>
                <td><button @click.prevent="confirm()">Оплачено</button></td>
            </tfoot>
        </table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rows: []
        }
    },
    computed:{
        total() {
            return this.rows.reduce((res, row) => res += row.price, 0)
        }
    },
    methods: {
        addRow(data) {
            this.rows.push(data)
        },
        confirm() {
            if (this.total > 0) this.$store.commit('addSale', this.total)
        }
    },
    mounted() {
        this.$parent.$children
            .filter(({ $refs }) => $refs.widget)
            .forEach(widget => widget.$on('add', this.addRow))
    }
}
</script>
