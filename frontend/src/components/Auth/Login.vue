<template>
    <div class="auth-login">
        <form @click="clearError">
            <div class="form-control">
                <at-input v-model="form.username" placeholder="Имя пользователя"></at-input>
            </div>
            <div class="form-control">
                <at-input v-model="form.password" type="password" placeholder="Пароль"></at-input>
            </div>
            <div class="form-control">
                <at-button @click="sendForm">Войти</at-button>
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

                    error: ''
                }
            }
        },
        methods: {
            sendForm: function () {
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
            },
            clearError: function () {
                this.form.error = '';
            }

        },
        // watch: {
        //     '$root.user': {
        //         handler: function (val, oldVal) {
        //             if (this.$root.user.isAuthenticated) {
        //                 this.$router.push('/page');
        //             }
        //         },
        //         deep: true
        //     }
        // },
    }
</script>

<style lang="less">
    .auth-field {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(#009eda,#a100f3);

        display: flex;

        justify-content: center;
        align-items: center;

        & .auth {
            width: 100%;
            max-width: 400px;
            padding: 10px;
            margin: 10px;
            background: #fff;
            box-shadow: 3px 3px 10px #343434;
            & form {
                & .form-control {
                    margin-bottom: 10px;
                    &:last-child {
                        margin-bottom: 0;
                    }


                    & h4 {
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
