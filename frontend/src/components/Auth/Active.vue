<template>
    <div class="auth-login">
        <at-alert message="Активация"
                  description="Вы успешно активировали свою учетую запись"
                  type="success" show-icon></at-alert>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "auth-login",
        data() {
            return {

            }
        },
        mounted: function () {
            document.title = this.$route.meta.title;
        },
        methods: {

        }
    }
</script>

<style lang="less">

</style>
