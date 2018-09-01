<template>
    <div class="content">
        <div class="edit-profile">
            <h3>Список пользователей</h3>

            <at-table
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
        data () {
            return {
                tableStruct: [
                    {
                        title: 'id',
                        key: 'id',
                        sortType: 'normal'
                    },
                    {
                        title: 'Имя пользователя',
                        key: 'username',
                        sortType: 'normal'
                    },
                    {
                        title: 'Email',
                        key: 'email',
                    },
                    {
                        title: 'Активен',
                        key: 'isActive',
                        sortType: 'normal',
                        render: (h, params) => {
                            return h('div', [
                                h('at-switch', {
                                    props: {
                                        size: 'small',
                                        value: params.item.isActivate
                                    },
                                    on: {
                                        change: () => {
                                            axios.get(`${this.$root.domain}/api/admin/activate`,{
                                                params: {
                                                    token: this.$root.user.token,
                                                    username: params.item.username
                                                }
                                            }).then((response)=>{
                                                this.$root.viewNotify('success','Успешно', `Статус ${params.item.username} изменен.`);
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
                        sortType: 'normal',
                        render: (h, params) => {
                            return h('div', [
                                h('at-switch', {
                                    props: {
                                        size: 'small',
                                        value: params.item.isAdmin
                                    },
                                    on: {
                                        change: () => {
                                            axios.get(`${this.$root.domain}/api/admin/activateAdmin`,{
                                                params: {
                                                    token: this.$root.user.token,
                                                    username: params.item.username
                                                }
                                            }).then((response)=>{
                                                this.$root.viewNotify('success','Успешно', `Права ${params.item.username} изменены.`);
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
                                            this.$router.push({ name: 'user-edit', params: { userId: params.item.id }})
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
            axios.get(`${this.$root.domain}/api/admin/get/users`,{
                params: {
                    token: this.$root.user.token
                }
            })
                .then((response) => {
                    this.users = response.data.users;

                })
                .catch((error) => {
                    this.$root.viewNotify('error','Ошибка', error.response.data.error);
                })
        },
        methods: {
            // this.$Modal.prompt({
            //     title: 'Tips',
            //     content: 'Please input your email:'
            //     }).then((data) => {
            //         this.$Message(`Click 'Confirm' Button, input value is ${data.value}`)
            //     }).catch(() => {
            //         this.$Message('Click \'Cancel\' Button')
            //     })
        }
    }
</script>

<style lang="less">

</style>
