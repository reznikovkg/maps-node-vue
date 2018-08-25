<template>
    <div class="auth-field">
        <div class="auth">
            <at-menu mode="horizontal">
                <at-menu-item
                        :router="true"
                        :to="{name: 'auth-login'}"
                        ><i class="icon icon-log-in"></i>Авторизация</at-menu-item>
                <at-menu-item
                        :router="true"
                        :to="{name: 'auth-register'}"
                        ><i class="icon icon-user-plus"></i>Регистрация</at-menu-item>
            </at-menu>

            <transition appear name="animate-auth" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "auth",
        data () {
            return {

            }
        },
        methods: {

        },
        watch: {
            '$root.user': {
                handler: function (val, oldVal) {
                    if (this.$root.user.isAuthenticated) {
                        this.$router.push('/page');
                    }
                },
                deep: true
            }
        },
    }
</script>

<style lang="less">
    .animate-auth-enter-active, .animate-auth-leave-active {
        transition: .3s ease-in-out;
    }
    .animate-auth-enter {
        opacity: 0;
        transform: translateX(500px);
    }
    .animate-auth-leave-to {
        opacity: 0;
        transform: translateX(-500px);
    }

    .auth-field {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(#009eda,#a100f3);
        overflow: hidden;

        display: flex;

        justify-content: center;
        align-items: center;

        & .auth {
            width: 100%;
            max-width: 300px;
            padding: 10px;
            margin: 10px;
            background: #fff;
            box-shadow: 3px 3px 10px #343434;
            overflow: hidden;
            border-radius: 5px;
            & form {
                & .form-control {
                    margin-bottom: 10px;
                    &:first-child {
                        margin-top: 10px;
                    }
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
