<template>
    <div class="page">
        <page-aside></page-aside>
        <div class="content-field">

            <div class="content">
                <router-view></router-view>
            </div>
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
        beforeMount: function () {
            if (!this.$root.user.isAuthenticated) {

            }
        }
    }
</script>

<style lang="less">
    .page {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(#009eda,#a100f3);

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
