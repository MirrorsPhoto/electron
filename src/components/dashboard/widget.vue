<template>
    <form ref="widget" class="widget_wrap" @submit.prevent="submit()">
        <span v-if="name === 'Фотография'" :class="['indicator', { active: $store.state.connect }]"></span>
        <div class="name">
            <icon :name="icon"></icon>
            <h4>{{ name }}</h4>
        </div>
        <div class="fields_wrap">
            <field
                v-if="name === 'Продажа'"
                width="120px"
                placeholder="Код товара"
                v-model="value"
            ></field>
            <slct
                v-else
                :options="slctOptions"
                width="120px"
                v-model="value"
            ></slct>
            <count :count.sync="count"></count>
        </div>
        <button type="submit"><icon name="chevron"></icon></button>
    </form>
</template>
<script>
export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            value: '',
            count: 1,
            price: 1,
            slctOptions: []
        }
    },
    methods: {
        submit() {
            const { name, value, count, price } = this
            this.count = 1
            this.$emit('add', { name, value, count, price })
        }
    },
    created() {
        const { name } = this
        
        if (name === 'Фотография') {
            this.$http
                .get('/photo/size')
                .then(data => this.slctOptions = data)
                .catch(err => console.error(err))
        }
        else if (name !== 'Продажа') {
            this.slctOptions = ['A4', 'A3']
        }
    },
    components: {
        icon : require('../UI/icon'),
        field: require('../UI/field'),
        slct : require('../UI/slct'),
        count: require('../UI/count')
    }
}
</script>
<style lang="sass" scoped>
@import '../../styles_config.sass'

.widget_wrap
    height: 70px
    display: flex
    justify-content: space-between
    position: relative
    overflow: hidden

    & + &
        margin-top: 20px

    & > *
        height: 100%

    & .indicator
        display: block
        width: 20px
        height: 20px
        border-radius: 50%
        background-color: $primary-color
        position: absolute
        left: -10px
        top: -10px

        &.active
            background-color: $green

    & .name
        padding: 15px 0
        border-right: 1px solid $light
        float: left
        text-align: center
        flex-basis: 130px

        & .icon
            fill: $primary-color

        & h4
            font-weight: normal

    & .fields_wrap
        padding: 15px 20px
        flex-grow: 1
        display: flex
        justify-content: space-between

    & button
        float: right
        border: none
        outline: none
        background: $light
        padding: 0 10px
        cursor: pointer
        transition: all .3s ease

        & .icon
            transform: rotate(90deg)
            fill: $hard

        &:hover
            background: $primary-color

            & .icon
                fill: #fff


</style>
