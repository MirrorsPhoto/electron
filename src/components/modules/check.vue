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
                <td><count :value.sync="row.count"></count></td>
                <td>{{ row.count * row.price }}</td>
            </tr>
            <tfoot>
                <td>{{ total }}</td>
                <td><button @click.prevent="confirm()">Оплачено</button></td>
            </tfoot>
        </table>
    </div>
</template>
<script>
import count from "../UI/count"
export default {
    data() {
        return {
            rows: []
        }
    },
    computed:{
        total() {
            return this.rows.reduce((res, row) => {
                return res += (row.count * row.price)
            }, 0)
        }
    },
    methods: {
        addRow(data) {
            const i = this.rows.findIndex(row => {
                return data.name === row.name && data.value === row.value)
            }
            (i || i === 0)
                ? this.rows[i].count += data.count
                : this.rows.push(data)
        },
        confirm() {
            if (this.total > 0) this.$store.commit('addSale', this.total)
        }
    },
    mounted() {
        this.$parent.$children
            .filter(({ $refs }) => $refs.widget)
            .forEach(widget => widget.$on('add', this.addRow))
    },
    components: { count }
}
</script>
