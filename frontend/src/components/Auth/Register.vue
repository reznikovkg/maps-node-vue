<template>
    <div class="auth-register">
        <form @keyup.enter="sendForm">
            <div class="form-control">
                <at-input
                        v-model="form.username"
                        :status="status.username"
                        placeholder="Имя пользователя"></at-input>
            </div>
            <div class="form-control">
                <at-input
                        v-model="form.email"
                        :status="status.email"
                        type="email"
                        placeholder="Email"></at-input>
            </div>
            <div class="form-control">
                <at-input
                        v-model="form.password"
                        :status="status.password"
                        type="password"
                        placeholder="Пароль"></at-input>
            </div>
            <div class="form-control">
                <at-input
                        v-model="form.password2"
                        :status="status.password2"
                        type="password"
                        placeholder="Повторите пароль"></at-input>
            </div>
            <div class="form-control">
                <at-button
                        :type="status.button"
                        @click="sendForm"
                        size="small"
                >Зарегистрировать</at-button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "auth-register",
        data () {
            return {
                form: {
                    username: '',
                    email: '',
                    password: '',
                    password2: '',
                },
                status: {
                    username: '',
                    email: '',
                    password: '',
                    password2: '',

                    button: ''
                },
                valid: {
                    username: false,
                    email: false,
                    password: false,
                    password2: false,
                }
            }
        },
        mounted: function () {
            document.title = this.$route.meta.title;
        },
        methods: {
            sendForm: function () {
                if ((this.valid.username) && (this.valid.email) && (this.valid.password) && (this.valid.password2)) {
                    axios.get(this.$root.domain + '/api/auth/register', {
                        params: {
                            username: this.form.username,
                            email: this.form.email,
                            password: this.form.password
                        }
                    })
                        .then((response) => {
                            this.$root.viewNotify('success','Успешно', 'Пользователь с именем ' + this.form.username + ' зарегистрирован.');
                            this.$router.push('/login');
                        })
                        .catch((error) => {
                            this.$root.viewNotify('error','Ошибка', error);
                        })
                } else {
                    if (!this.valid.username) {
                        this.status.username = 'error';
                    }
                    if (!this.valid.password) {
                        this.status.password = 'error';
                    }
                    if (!this.valid.email) {
                        this.status.email = 'error';
                    }
                    if (!this.valid.password2) {
                        this.status.password2 = 'error';
                    }

                    this.status.button = 'error';

                    this.$root.viewNotify('error','Ошибка', 'Поля должны быть заполнены');
                }
            }
        },
        watch: {
            'form.username':function () {
                if ((this.form.username.length > 0) && ( /^[a-zA-Z0-9]+$/.test(this.form.username))) {
                    axios.get(this.$root.domain + '/api/auth/uniqueUsername', {
                        params: {
                            username: this.form.username,
                        }
                    })
                        .then((response) => {
                            this.valid.username = true;
                            this.status.username = 'success';
                        })
                        .catch((error) => {
                            this.valid.username = false;
                            this.status.username = 'error';
                        })
                } else {
                    this.valid.username = false;
                    this.status.username = 'error';
                }
            },
            'form.email':function () {
                if ((this.form.email.length > 0) && ( /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.form.email))) {
                    this.valid.email = true;
                    this.status.email = 'success';
                } else {
                    this.valid.email = false;
                    this.status.email = 'error';
                }
            },
            'form.password':function () {
                if ((this.form.password.length >= 1)  && ( /^[a-zA-Z0-9*#!+]+$/.test(this.form.password))){
                    this.valid.password = true;
                    this.status.password = 'success';
                } else {
                    this.valid.password = false;
                    this.status.password = 'error';
                }
            },
            'form.password2':function () {
                if ((this.form.password2.length >= 1)  && ( this.form.password === this.form.password2)){
                    this.valid.password2 = true;
                    this.status.password2 = 'success';
                } else {
                    this.valid.password2 = false;
                    this.status.password2 = 'error';
                }
            },
            form: {
                handler: function (val, oldVal) {
                    if ((this.valid.username) && (this.valid.email) && (this.valid.password) && (this.valid.password2)) {
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
