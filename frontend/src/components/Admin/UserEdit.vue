<template>
    <div class="content">
        <div class="user-edit">
            <h3>Редактировать пользователя</h3>
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
    import axios from 'axios';

    export default {
        name: "UserList",
        data () {
            return {
                form:{
                    username:'',
                    birthday: {
                        date: '',
                        day: '',
                        month: '',
                        year: ''
                    },
                }
            }
        },
        mounted: function () {

        },
        methods: {

        }
    }
</script>

<style lang="less">

</style>
