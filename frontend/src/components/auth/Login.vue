<template>
    <div class="row at-row flex-center flex-middle">
        <div class="col-md-4">
            <div class="at-box-row bg-c-brand-light">

                <form>
                    <h4>Авторизация</h4>
                    <at-input v-model="inputUsername" placeholder="Имя пользователя"></at-input>
                    <at-input v-model="inputPassword" type="password" placeholder="Пароль"></at-input>
                    <at-button>Войти</at-button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "auth-login"
    }
</script>

<style scoped>

</style>
