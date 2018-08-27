<template>
    <div class="content">
        <div class="user-edit">
            <h3>Редактировать пользователя</h3>
            <form>

                <div class="form-control">
                    <label>Имя пользователя</label>
                    <at-input
                            v-model="form.username"
                            :status="status.username"
                            placeholder="Имя пользователя">
                    </at-input>
                </div>

                <div class="form-control">
                    <label>Дата рождения</label>
                    <datepicker
                            :language="ru"
                            :format="customFormatter"
                            :placeholder="form.birthdayText"
                            :value="form.birthday"
                            :input-class="'at-input__original'">
                    </datepicker>
                </div>


                <div class="form-control">
                    <at-button :type="form.status"
                               @click="sendForm"
                    >Сохранить</at-button>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Datepicker from 'vuejs-datepicker';
    import {ru} from 'vuejs-datepicker/dist/locale'

    export default {
        name: "UserList",
        components: {
            Datepicker
        },
        data () {
            return {
                ru: ru,
                form: {
                    username: '',
                    birthday: '',
                    birthdayText: ''
                },
                status: {
                    username: 'success',
                    birthday: 'success',
                    button: 'default'
                },
                valid: {
                    username: true,
                    birthday: true
                }


            }
        },
        mounted: function () {
            axios.get(this.$root.domain + '/api/admin/edit', {
                params: {
                    token: this.$root.user.token,
                    id: this.$route.params.userId,
                }
            })
                .then((response) => {
                    console.log(response.data);
                    this.form.username = response.data.user.username;

                    this.form.birthday = new Date(response.data.user.birthday);

                    var mon = this.form.birthday.getMonth() + 1;

                    this.form.birthdayText = this.form.birthday.getFullYear() + '-' +
                        mon + '-' +
                        this.form.birthday.getDate();

                })
                .catch((error) => {
                    this.$root.viewNotify('error','Ошибка', error);
                })
        },
        methods: {
            customFormatter(date) {
                this.form.birthday = date;

                var mon = this.form.birthday.getMonth() + 1;

                this.form.birthdayText = this.form.birthday.getFullYear() + '-' +
                    mon + '-' +
                    this.form.birthday.getDate();
            },
            setForm: function () {
                this.form.username = this.$root.user.username;

                this.form.birthday = new Date(this.$root.user.birthday);

                var mon = this.form.birthday.getMonth() + 1;

                this.form.birthdayText = this.form.birthday.getFullYear() + '-' +
                    mon + '-' +
                    this.form.birthday.getDate();
            },
            sendForm: function () {
                if ((this.valid.username) && (this.valid.birthday)) {
                    axios.get(this.$root.domain + '/api/admin/edit', {
                        params: {
                            token: this.$root.user.token,
                            id: this.$route.params.userId,

                            username: this.form.username,
                            birthday: this.form.birthdayText,
                        }
                    })
                        .then((response) => {
                            this.$root.viewNotify('success','Успешно', 'Информация обновлена');
                        })
                        .catch((error) => {
                            this.$root.viewNotify('error','Ошибка', error);
                        })
                } else {
                    if (!this.valid.username) {
                        this.status.username = 'error';
                    }
                    if (!this.valid.birthday) {
                        this.status.birthday = 'error';
                    }

                    this.status.button = 'error';

                    this.$root.viewNotify('error','Ошибка', 'Поля должны быть заполнены');
                }
            },
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
                            this.valid.username = true;
                            this.status.username = 'success';
                        })
                } else {
                    this.valid.username = false;
                    this.status.username = 'error';
                }
            },
        }
    }
</script>

<style lang="less">

    .user-edit {
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
