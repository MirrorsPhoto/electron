<template>
    <div>
        <h1>Привет, мама Сережи!</h1>
        <button @click.prevent="logOut()">Выйти в падик</button>
    </div>
</template>
<script>
    export default {
        methods: {
            logOut() {
                localStorage.removeItem('token');
                this.$router.push('/login');
            }
        }
    }
</script>