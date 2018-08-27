<template>
    <div class="content">
        <div class="edit-profile">
            <h3>Сменить пароль (not work)</h3>
            <form>

                <div class="form-control">
                    <label>Пароль</label>
                    <at-input
                            v-model="form.password"
                            :status="status.password"
                            placeholder="Пароль">
                    </at-input>
                </div>

                <div class="form-control">
                    <label>Повторите пароль</label>
                    <at-input
                            v-model="form.password2"
                            :status="status.password2"
                            placeholder="Повторите пароль">
                    </at-input>
                </div>

                <div class="form-control">
                    <at-button :type="status.button">Сохранить</at-button>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditProfile",
        data () {
            return {
                form: {
                    password: '',
                    password2: '',
                },
                status: {
                    password: 'default',
                    password2: 'default',
                    button: 'default'
                },
                valid: {
                    password: true,
                    password2: true
                }

            }
        },
        watch: {
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
                if ((this.form.password2) === (this.form.password)){
                    this.valid.password2 = true;
                    this.status.password2 = 'success';
                } else {
                    this.valid.password2 = false;
                    this.status.password2 = 'error';
                }
            },
        },
    }
</script>

<style lang="less">
    .edit-profile {
        & > h3 {
            margin-bottom: 10px;
        }

        & > form {
            & .form-control {
                margin-bottom: 10px;
            }
        }
    }
</style>
