<template>
    <div>
        <form>
            <img src="../../assets/logo.svg"/>
            <field
                placeholder="Логин"
                type="text"
                v-model="login"
            ></field>
            <field
                placeholder="Пароль"
                type="password"
                v-model="password"
            ></field>
        </form>
    </div>
</template>

<script>
    import field from '../UI/field.vue'

    export default {
        data() {
            return {
                login: '',
                password: ''
            }
        },
        components: {
            field
        }
    }
</script>

<style lang="sass">
    div 
        background: url(../../assets/bg.jpg)
        display: flex
        align-items: center

    form 
        width: 300px
        padding: 30px

</style>