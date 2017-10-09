<template>
    <form ref="widget" class="widget_wrap" @submit.prevent="$emit('add', returnedData)">
        <span v-if="name === 'Фотография'" :class="['indicator', { active: $store.state.connect }]"></span>
        <div class="name">
            <icon :name="icon"></icon>
            <h4>{{ name }}</h4>
        </div>
        <div class="fields_wrap">
            <field
                v-if="isSale"
                width="120px"
                placeholder="Код товара"
                v-model="returnedData.value"
            ></field>
            <slct
                v-else
                :options="slctOptions"
                width="120px"
                v-model="returnedData.value"
            ></slct>
            <count v-model="returnedData.count"></count>
        </div>
        <button type="submit"><icon name="chevron"></icon></button>
    </form>
</template>
<script>
import icon from '../UI/icon'
import field from '../UI/field'
import slct from '../UI/slct'
import count from '../UI/count'

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
            returnedData: {
                name: this.name,
                value: '',
                count: 1,
                price: 1
            },
            widgetsSizes: {
                'Фотография': ['3x3', '3x4'],
                'Ксерокопия': ['А4', 'А3'],
                'Ламинация': ['А4', 'А3']
            }
        }
    },
    computed: {
        isSale() {
            return this.name === 'Продажа'
        },
        slctOptions() {
            return !this.isSale ? this.widgetsSizes[this.name] : []
        }
    },
    components: { icon, field, slct, count }
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
