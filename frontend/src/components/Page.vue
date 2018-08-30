<template>
    <div class="page">
        <page-aside></page-aside>
        <div class="content-field">

            <transition appear name="animate-content" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import PageNavbar from "./Nav/PageNavbar";
    import PageAside from "./Nav/PageAside";

    export default {
        name: "auth-login",
        components: {
            PageAside, PageNavbar,
        },
        data () {
            return {
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {

        },
        watch: {
            '$root.user': {
                handler: function (val, oldVal) {
                    if (!this.$root.user.isAuthenticated) {
                        this.$router.push('/login');
                    }
                },
                deep: true,
                immediate: true

            }
        },
    }
</script>

<style lang="less">

    .animate-content-enter-active, .animate-content-leave-active {
        transition: .3s ease-in-out;
    }
    .animate-content-enter, .animate-content-leave-to {
        opacity: 0;
        transform: translateX(500px);
    }

    @colorWhite: #ffffff;
    @colorBlue: #009eda;
    @colorPurple: #a100f3;
    @colorBlueDark: #181150;
    .page {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(@colorBlue,@colorPurple);
        overflow: hidden;

        & .content-field {
            position: absolute;
            top: 0;
            left: 300px;
            right: 0;
            bottom: 0;
            padding: 20px;

            & .content {
                width: 100%;
                border-radius: 5px;
                padding: 20px;
                background: @colorWhite;
                box-shadow: 3px 3px 20px @colorBlueDark;
                & .at-table__body {
                    overflow: auto;
                }
            }
        }
    }
</style>
