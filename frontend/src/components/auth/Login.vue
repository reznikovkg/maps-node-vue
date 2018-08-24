<template>
        <div class="row at-row flex-center flex-middle">
            <div class="col-md-4">
                <div class="at-box-row bg-c-brand-light">

                    <form @click="clearError">
                        <h4>Авторизация</h4>
                        <at-input v-model="form.username" placeholder="Имя пользователя"></at-input>
                        <at-input v-model="form.password" type="password" placeholder="Пароль"></at-input>
                        <at-button @click="sendForm">Войти</at-button>
                        <p>{{ form.error }}</p>
                    </form>
                </div>
            </div>
        </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "auth-login",
        data () {
            return {
                form: {
                    username: '',
                    password: '',

                    error: ''
                }
            }
        },
        methods: {
            sendForm: function () {
                axios.get(this.$root.domain + '/api/auth/login',{
                    params: {
                        username: this.form.username,
                        password: this.form.password
                    }
                })
                    .then((response) => {
                        this.$root.user.token = response.data.token;
                    })
                    .catch((error) => {
                        this.form.error = error.response.data.error;
                    })
            },
            clearError: function () {
                this.form.error = '';
            }
        },
        mounted: function () {
            if (this.$root.user.isAuthenticated) {
                this.$router.push('/page');
            }
        },
        updated: function () {
            console.log(this.$root.user.isAuthenticated);

            if (this.$root.user.isAuthenticated) {
                this.$router.push('/page');
            }
        }
    }
</script>

<style lang="less">

</style>
