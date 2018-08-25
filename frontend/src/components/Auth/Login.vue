<template>
    <div class="auth-login">
        <form @click="clearError">
            <div class="form-control">
                <at-input
                        v-model="form.username"
                        :status="status.username"
                        placeholder="Имя пользователя"></at-input>
            </div>
            <div class="form-control">
                <at-input
                        v-model="form.password"
                        :status="status.password"
                        type="password"
                        placeholder="Пароль"></at-input>
            </div>
            <div class="form-control">
                <at-button
                        :type="status.button"
                        @click="sendForm"
                        size="small"
                        >Войти</at-button>
            </div>
        </form>
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
                },
                status: {
                    username: '',
                    password: '',
                    button: ''
                },
                valid: {
                    username: false,
                    password: false
                }
            }
        },
        methods: {
            sendForm: function () {
                if ((this.valid.username) && (this.valid.password)) {

                    axios.get(this.$root.domain + '/api/Auth/login',{
                        params: {
                            username: this.form.username,
                            password: this.form.password
                        }
                    })
                        .then((response) => {
                            this.$root.user.token = response.data.token;
                        })
                        .catch((error) => {
                            this.$root.viewNotify('error','Ошибка', error.response.data.error);
                        })

                } else {
                    if (!this.valid.username) {
                        this.status.username = 'error';
                    }
                    if (!this.valid.password) {
                        this.status.password = 'error';
                    }

                    this.status.button = 'error';

                    this.$root.viewNotify('error','Ошибка', 'Поля должны быть заполнены');
                }

            },
            clearError: function () {
                this.form.error = '';
            }

        },
        watch: {
            'form.username':function () {
                if ((this.form.username.length > 0) && ( /^[a-zA-Z0-9]+$/.test(this.form.username))) {
                    this.valid.username = true;
                    this.status.username = 'success';
                } else {
                    this.valid.username = false;
                    this.status.username = 'error';
                }
            },

            'form.password':function () {
                if (this.form.password.length >= 1) {
                    this.valid.password = true;
                    this.status.password = 'success';
                } else {
                    this.valid.password = false;
                    this.status.password = 'error';
                }
            },
            form: {
                handler: function (val, oldVal) {
                    if ((this.valid.username) && (this.valid.password)) {
                        this.status.button = 'success';
                    } else {
                        this.status.button = 'error';
                    }
                },
                deep: true
            }
        }
    }
</script>

<style lang="less">

</style>
