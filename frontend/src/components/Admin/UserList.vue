<template>
    <div class="content">
        <div class="edit-profile">
            <h3>Список пользователей</h3>

            <at-table
                    v-if="users"
                    :columns="tableStruct"
                    :data="users"
                    size="small"
                    sort
            ></at-table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "UserList",
        data() {
            return {
                tableStruct: [
                    {
                        title: 'id',
                        key: 'id',
                    },
                    {
                        title: 'Имя пользователя',
                        key: 'username',
                    },
                    {
                        title: 'Email',
                        key: 'email',
                    },
                    {
                        title: 'Активен',
                        key: 'isActivate',
                        render: (h, params) => {
                            return h('div', [
                                h('at-switch', {
                                    props: {
                                        size: 'small',
                                        value: params.item.isActivate
                                    },
                                    on: {
                                        change: () => {
                                            axios.get(`${this.$root.domain}/api/admin/activate`, {
                                                params: {
                                                    token: this.$root.user.token,
                                                    username: params.item.username
                                                }
                                            }).then((response) => {
                                                this.$root.viewNotify('success', 'Успешно', `Статус ${params.item.username} изменен.`);
                                            });
                                        }
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: 'Админ',
                        key: 'isAdmin',
                        render: (h, params) => {
                            return h('div', [
                                h('at-switch', {
                                    props: {
                                        size: 'small',
                                        value: params.item.isAdmin
                                    },
                                    on: {
                                        change: () => {
                                            axios.get(`${this.$root.domain}/api/admin/activateAdmin`, {
                                                params: {
                                                    token: this.$root.user.token,
                                                    username: params.item.username
                                                }
                                            }).then((response) => {
                                                this.$root.viewNotify('success', 'Успешно', `Права ${params.item.username} изменены.`);
                                            });
                                        }
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: 'Настройки',
                        render: (h, params) => {
                            return h('div', [
                                h('at-button', {
                                    props: {
                                        size: 'small',
                                        value: params.item.isAdmin
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({name: 'user-edit', params: {userId: params.item.id}})
                                        }
                                    }
                                }, 'Редактировать')
                            ])
                        }
                    }

                ],
                users: []
            }
        },
        mounted: function () {
            this.usersUpdate();
        },
        methods: {
            usersUpdate: function () {
                axios.get(`${this.$root.domain}/api/admin/getUsers`, {
                    params: {
                        token: this.$root.user.token
                    }
                })
                    .then((response) => {
                        this.users = response.data.users;

                        var usersList = this.users;
                        usersList.forEach((item, i, userList) => {
                            if (item.username == this.$root.user.username) {
                                this.users.splice(this.users.indexOf(item), 1);
                            }
                        });

                    })
                    .catch((error) => {
                        this.$root.viewNotify('error', 'Ошибка', error.response.data.error);
                    })
            },
            reUpdate: function () {
                this.users = null;
                this.usersUpdate();
            }
        }
    }
</script>

<style lang="less">

</style>
