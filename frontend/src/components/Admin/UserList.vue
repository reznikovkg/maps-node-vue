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
                        render: (h, params) => {
                            return h('div', [
                                h('at-switch', {
                                    props: {
                                        size: 'small',
                                        value: params.item.isActivate
                                    },
                                    on: {
                                        change: () => {
                                            axios.get(this.$root.domain + '/api/auth/activate',{
                                                params: {
                                                    username: params.item.username
                                                }
                                            });
                                        }
                                    }
                                }, 'View Address')
                            ])
                        }
                    },
                    {
                        title: 'Админ',
                        render: (h, params) => {
                            return h('div', [
                                h('at-switch', {
                                    props: {
                                        size: 'small',
                                        value: params.item.isAdmin
                                    },
                                    on: {
                                        change: () => {
                                            this.$Message(params.item.username)
                                        }
                                    }
                                }, 'View Address')
                            ])
                        }
                    }

                ],
                users: []
            }
        },
        mounted: function () {
            console.log(213);
            axios.get(this.$root.domain + '/api/admin/get/users',{
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
        }
    }
</script>

<style lang="less">

</style>
