<template>
    <div class="content">
        <div class="edit-profile">
            <h3>Редактировать профиль</h3>
            <form>

                <div class="form-control">
                    <label>Имя пользователя</label>
                    <at-input v-model="form.username" placeholder="Имя пользователя">
                    </at-input>
                </div>

                <div class="form-control">
                    <label>Дата рождения</label>
                    <at-select v-model="form.birthday.day" filterable style="width:100px">
                        <at-option v-for="item in 31" :value="item">{{item}}</at-option>
                    </at-select>

                    <at-select v-model="form.birthday.month" filterable style="width:100px">
                        <at-option v-for="item in 12" :value="item">{{ item }}</at-option>
                    </at-select>

                    <at-select v-model="form.birthday.year" filterable style="width:100px">
                        <at-option v-for="item in 70" :value="item + 1950">{{item + 1950}}</at-option>
                    </at-select>
                </div>

                <div class="form-control">
                    <at-button :type="form.status">Сохранить</at-button>
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
                    username: this.$root.user.username,
                    birthday: {
                        date: '',
                        day: '',
                        month: '',
                        year: ''
                    },

                    status: 'default'
                },

            }
        },
        mounted: function () {
            this.setForm();
            console.log(2222)
        },
        methods: {
            setForm: function () {
                this.form.username = this.$root.user.username;

                var date = new Date(this.$root.user.birthday);
                this.form.birthday.day = date.getDate();
                this.form.birthday.month = date.getMonth();
                this.form.birthday.year = date.getFullYear();
            }
        },
        watch: {
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
</style>
