<template>
    <div class="page-aside">
        <div class="aside-user">
            <h4 class="aside-user-name" :class="{ admin: this.$root.user.isAdmin }">
                {{ this.$root.user.username }}
            </h4>
            <div>
                <at-button @click="outLogin" size="small" icon="icon-power">Выйти</at-button>
            </div>
        </div>

        <div class="aside-menu">
            <at-menu mode="vertical" width="100%">

                <at-submenu v-if="this.$root.user.isAdmin">
                    <template slot="title"><i class="icon icon-lock"></i>Администратор</template>
                    <at-menu-item
                            :router="true"
                            :to="{name : 'user-list'}">
                        <i class="icon icon-list"></i>Список пользователей</at-menu-item>
                </at-submenu>

                <at-submenu>
                    <template slot="title"><i class="icon icon-globe"></i>Карты</template>
                    <at-menu-item
                    >
                        <i class="icon icon-map-pin"></i>Локации</at-menu-item>
                </at-submenu>


                <at-submenu>
                    <template slot="title"><i class="icon icon-settings"></i>Настройки</template>
                    <at-menu-item
                            :router="true"
                            :to="{name : 'edit-profile'}">
                        <i class="icon icon-edit-1"></i>Редактировать профиль</at-menu-item>
                    <at-menu-item
                            :router="true"
                            :to="{name : 'edit-password'}">
                        <i class="icon icon-refresh-cw"></i>Сменить пароль</at-menu-item>
                </at-submenu>

            </at-menu>
        </div>
    </div>
</template>

<script>
    export default {
        name: "page-aside",
        data () {
          return {
          }
        },
        methods: {
            outLogin: function () {
                this.$root.userOut();
            }
        }
    }
</script>

<style lang="less">

    @colorWhite: #ffffff;
    @colorGrey: #343434;
    @colorBlue: #009eda;
    @colorPurple: #a100f3;
    @colorBlueDark: #181150;

    .page-aside {
        width: 300px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        background: @colorWhite;
        box-shadow: 0 0 8px @colorBlueDark;
        & .aside-user {
            & .aside-user-name {
                text-align: center;
                padding: 10px;
                &.admin {
                    color: @colorBlue;
                    font-size: 25px;
                }
            }
            & .aside-user-admin {
                margin-bottom: 10px;
            }
            & p {
                text-align: center;
            }
            & div {
                text-align: center;
            }
        }
    }
</style>
