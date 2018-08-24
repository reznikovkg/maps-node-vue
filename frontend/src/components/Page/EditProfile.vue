<template>
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
</template>

<script>
    export default {
        name: "EditProfile",
        data () {
            return {
                form: {
                    username: this.$root.user.username,
                    birthday: {
                        date: new Date(this.$root.user.birthday),
                        day: new Date(this.$root.user.birthday).getDate(),
                        month: new Date(this.$root.user.birthday).getMonth(),
                        year: new Date(this.$root.user.birthday).getFullYear()
                    },

                    status: 'default'
                },

            }
        }
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
