<template>
        <div class="row at-row flex-center flex-middle">
            <div class="col-md-4">
                <div class="at-box-row bg-c-brand-light">
Вошли
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
                    password: ''
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
            }
        },
        beforeMount: function () {
            if (!this.$root.user.isAuthenticated) {
                this.$route.torouter.push('home')
            }
        }
    }
</script>

<style scoped>

</style>
