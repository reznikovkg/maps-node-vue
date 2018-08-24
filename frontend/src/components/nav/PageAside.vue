<template>
    <div class="page-aside">
        <div class="aside-user">
            <h4 class="aside-user-name">
                {{ this.$root.user.username }}
            </h4>
        </div>

        <div class="aside-menu">
            <at-menu mode="vertical" width="100%">

                <at-menu-item
                        :router="true"
                        :to="{name : 'edit-profile'}">
                    <i class="icon icon-home"></i>Редактировать профиль
                </at-menu-item>

                <at-menu-item
                        :router="true"
                        :to="{name : 'edit-password'}">
                    <i class="icon icon-home"></i>Сменить пароль
                </at-menu-item>

                <!--<at-menu-item name="2"><i class="icon icon-layers"></i>Navigation Two</at-menu-item>-->
                <!--<at-submenu>-->
                    <!--<template slot="title"><i class="icon icon-life-buoy"></i>Navigation Three</template>-->
                    <!--<at-menu-item-group title="Group One">-->
                        <!--<at-menu-item name="3-1">Submenu One</at-menu-item>-->
                        <!--<at-menu-item name="3-2">Submenu Two</at-menu-item>-->
                    <!--</at-menu-item-group>-->
                    <!--<at-menu-item-group title="Group Two">-->
                        <!--<at-menu-item name="3-3">Submenu Three</at-menu-item>-->
                        <!--<at-menu-item name="3-4">Submenu Four</at-menu-item>-->
                    <!--</at-menu-item-group>-->
                <!--</at-submenu>-->
                <!--<at-submenu>-->
                    <!--<template slot="title"><i class="icon icon-life-buoy"></i>Navigation Four</template>-->
                    <!--<at-menu-item name="4-1"><i class="icon icon-settings"></i>Submenu Five</at-menu-item>-->
                    <!--<at-menu-item name="4-2"><i class="icon icon-settings"></i>Submenu Six</at-menu-item>-->
                    <!--<at-submenu>-->
                        <!--<template slot="title"><i class="icon icon-life-buoy"></i>Submenu Seven</template>-->
                        <!--<at-menu-item name="4-3-1"><i class="icon icon-settings"></i>Submenu Eight</at-menu-item>-->
                        <!--<at-menu-item name="4-3-2"><i class="icon icon-settings"></i>Submenu Night</at-menu-item>-->
                    <!--</at-submenu>-->
                <!--</at-submenu>-->
            </at-menu>
        </div>
    </div>
</template>

<script>
    export default {
        name: "aside"
    }
</script>

<style lang="less">
    .page-aside {
        width: 300px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        background: #fff;
        box-shadow: 0px 0px 8px #181150;
        & .aside-user {

        }
    }
</style>
