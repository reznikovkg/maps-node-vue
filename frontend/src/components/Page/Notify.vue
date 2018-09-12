<template>
    <div class="content">
        <div class="notify">
            <h3>Уведомления</h3>

            <p v-if="!notifys">
                Новых уведомлений нет
            </p>

            <at-alert
                    v-for="item in notifys"
                    :key="item.id"
                    :message="item.head"
                    :description="item.text"
                    :type="item.type"
                    @on-close="removeNotify(item.id)"
                    closable></at-alert>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Notify",
        data() {
            return {
                notifys: [
                    {
                        id: 1,
                        head:'dsad',
                        text:'dsadsa',
                        status: 'error'
                    }
                ]
            }
        },
        mounted: function () {
            this.getNotifys();
        },
        methods: {
            getNotifys: function () {
                axios.get(`${this.$root.domain}/api/user/getNotifys`, {
                    params: {
                        user: this.$root.user.id,
                    }
                })
                    .then((response) => {
                        this.notifys = response.data.notifys;
                        if (this.notifys.length == 0) {
                            this.notifys = null;
                        }
                    })
            },
            removeNotify: function (id) {
                axios.get(`${this.$root.domain}/api/user/removeNotify`, {
                    params: {
                        id: id,
                    }
                })
                    .then((response) => {
                        this.getNotifys();
                        this.$root.getNotifyNumber();
                    })
            }
        },
    }
</script>

<style lang="less">
    .notify {
        & > h3 {
            margin-bottom: 10px;
        }
    }
</style>
