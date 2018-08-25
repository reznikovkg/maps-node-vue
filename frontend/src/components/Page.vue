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
    import PageNavbar from "./nav/PageNavbar";
    import PageAside from "./nav/PageAside";

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
                deep: true
            }
        },
    }
</script>

<style lang="less">

    .animate-content-enter-active, .animate-content-leave-active {
        transition: .3s ease-in-out;
    }
    .animate-content-enter, .animate-content-leave-to
        /* .component-fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
        transform: translateX(500px);
    }

    .page {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(#009eda,#a100f3);
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
                background: #fff;
                box-shadow: 3px 3px 20px #181150;
            }
        }
    }
</style>
