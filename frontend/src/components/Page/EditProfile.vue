<template>
    <div class="content">
        <div class="edit-profile">
            <h3>Редактировать профиль</h3>
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
                    <at-button
                            :type="status.button"
                            @click="sendForm">Сохранить</at-button>
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
        name: "EditProfile",
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
                    button: 'default'
                },
                valid: {
                    username: true,
                    birthday: true
                }

            }
        },
        mounted: function () {
            this.setForm()
        },
        methods: {
            customFormatter(date) {
                this.form.birthday = date;

                this.form.birthdayText = `${this.form.birthday.getFullYear()}-${this.form.birthday.getMonth() + 1}-${this.form.birthday.getDate()}`;
            },
            setForm: function () {
                this.form.username = this.$root.user.username;

                this.form.birthday = new Date(this.$root.user.birthday);

                this.form.birthdayText = `${this.form.birthday.getFullYear()}-${this.form.birthday.getMonth()}-${this.form.birthday.getDate()}`;
            },
            sendForm: function () {
                if ((this.valid.username) && (this.valid.birthday)) {
                    axios.get(`${this.$root.domain}/api/user/edit`, {
                        params: {
                            token: this.$root.user.token,
                            username: this.form.username,
                            birthday: this.form.birthdayText,
                        }
                    })
                        .then((response) => {
                            this.$root.viewNotify('success','Успешно', 'Информация обновлена');
                            this.$root.authenticated();
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
            }
        },
        watch: {
            'form.username':function () {
                if ((this.form.username.length > 0) && ( /^[a-zA-Z0-9]+$/.test(this.form.username))) {
                    axios.get(`${this.$root.domain}/api/auth/uniqueUsername`, {
                        params: {
                            username: this.form.username,
                        }
                    })
                        .then((response) => {
                            this.valid.username = true;
                            this.status.username = 'success';
                        })
                        .catch((error) => {
                            if (this.form.username === this.$root.user.username) {
                                this.valid.username = true;
                                this.status.username = 'success';
                            } else {
                                this.valid.username = false;
                                this.status.username = 'error';
                            }
                        })
                } else {
                    this.valid.username = false;
                    this.status.username = 'error';
                }
            },
            '$root.user' : {
                handler: function (val, oldVal) { this.setForm() },
                deep: true
            }
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

    .vdp-datepicker__calendar {
        border-radius: 10px;
        width: 100%;
    }
</style>
