<template>
    <div class="content">
        <GmapMap
                :center="center"
                :zoom="zoom"
                map-type-id="terrain"
                class="map-view"
                @click="choiseLocation"
        >
            <!--маркеры-->
            <GmapMarker
                    v-for="(marker, index) in markers"
                    :key="marker.name"
                    :position="{ lat: marker.lat, lng: marker.lng}"
                    :clickable="true"/>

            <!--юзеры-->
            <GmapMarker
                    v-for="(locationUser, index) in locationUsers"
                    :key="locationUser.user"
                    :label="'User'"
                    :position="{ lat: locationUser.lat, lng: locationUser.lng}"
                    :clickable="true"/>

            <!--локации-->
            <gmap-circle
                    @click="choiseLocation"
                    v-for="(locCircle, index) in locationCircle"
                    :key="locCircle.id"
                    :bounds="circleBounds"
                    :center="{lat:locCircle.lat, lng:locCircle.lng}"
                    :radius="locCircle.radius"
                    :options="{editable: false}"
                    @radius_changed="updateCircle('radius', $event)"
                    @bounds_changed="updateCircle('bounds', $event)"></gmap-circle>


            <!--новый маркер-->
            <GmapMarker
                    v-if="addMarkerFormActive"
                    :position="{ lat: addMarker.lat, lng: addMarker.lng}"
                    :clickable="true"
                    :draggable="true"/>

            <!--новая локация-->
            <gmap-circle
                    v-if="addLocationFormActive"
                    :bounds="circleBounds"
                    :center="{lat:addLocationForm.lat, lng:addLocationForm.lng}"
                    :radius="addLocationForm.radius"
                    :draggable="true"
                    :style="{'color': 'red'}"

                    ref="gmapcircle"

                    :options="{editable: true}"
            ></gmap-circle>
        </GmapMap>


        <div class="nav-locations">
            <at-button @click="addMarkerAction" size="small" icon="icon-plus" type="primary">Добавить маркер</at-button>
            <at-button @click="addLocationAction" size="small" icon="icon-plus" type="primary">Добавить локацию
            </at-button>
        </div>

        <div class="form-add-location" :class="{ active: addMarkerFormActive }">
            <form action="">
                <div class="form-control">
                    <at-input v-model="addMarkerForm.name" placeholder="Название маркера"></at-input>
                </div>
                <div class="form-control">
                    <at-input v-model="addMarkerForm.latLng" placeholder="Координаты (указать на карте)"
                              disabled></at-input>
                </div>

            </form>
            <at-button @click="sendFormMarker" size="small" icon="icon-save" type="primary">Сохранить</at-button>
        </div>


        <div class="form-add-location" :class="{ active: addLocationFormActive }">
            <form action="">
                <div class="form-control">
                    <at-input v-model="addLocationForm.name" placeholder="Название локации"></at-input>
                </div>
                <div class="form-control">
                    <at-input v-model="addLocationForm.latLngRad" placeholder="Координаты (указать на карте)"
                              disabled></at-input>
                </div>

            </form>
            <at-button @click="sendFormLocation" size="small" icon="icon-save" type="primary">Сохранить</at-button>
        </div>


        <at-table
                :columns="tableStruct"
                :data="locationCircle"
                size="small"
                sort
        ></at-table>
    </div>
</template>

<script>
    import axios from 'axios';
    import {gmapApi} from 'vue2-google-maps';

    export default {
        name: "Locations",
        data() {
            return {
                reportedCenter: {
                    lat: 48.8538302,
                    lng: 2.2982161
                },
                map: null,
                markers: [],
                locationCircle: [],
                locationUsers: [],
                circleBounds: {},
                center: {lat: -34.397, lng: 150.644},
                zoom: 2,

                addMarkerFormActive: false,
                addLocationFormActive: false,
                addMarker: {
                    lat: 0,
                    lng: 0
                },
                addMarkerForm: {
                    name: '',

                    latLng: '',

                    lat: '',
                    lng: ''
                },
                addLocationForm: {
                    name: '',

                    latLngRad: '',

                    lat: 10,
                    lng: 10,
                    radius: 10000
                },


                tableStruct: [
                    {
                        title: 'Название локации',
                        key: 'name',
                        sortType: 'normal'
                    },
                    {
                        title: 'Настройки',
                        key: 'isActive',
                        render: (h, params) => {
                            return h('div', [
                                h('at-button', {
                                    props: {
                                        size: 'small',
                                    },
                                    on: {
                                        click: () => {
                                            var loc = this.locationUsers;
                                            var cir = params.item;

                                            var rad = cir.radius;
                                            cir = new google.maps.LatLng(cir.lat, cir.lng);

                                            var inCircle = false;

                                            loc.forEach((item, i, loc) => {
                                                var point = new google.maps.LatLng(item.lat, item.lng);
                                                var distance = google.maps.geometry.spherical.computeDistanceBetween(point, cir);
                                                if (distance < rad) {
                                                    inCircle = true;
                                                }
                                            });

                                            if (inCircle) {
                                                this.$Modal.confirm({
                                                    title: 'Внимание!',
                                                    content: 'Вы хотите удалить локацию с пользователями. Продолжить удаление?'
                                                }).then(() => {
                                                    this.okRemoveLocation(params.item);
                                                }).catch(() => {
                                                    this.$Message('Вы отменили удаление')
                                                });
                                            } else {
                                                this.okRemoveLocation(params.item);
                                            }
                                        }
                                    }
                                }, 'Удалить')
                            ])
                        }
                    },
                ],
                lat: null,
                lng: null,
            }
        },
        computed: {
            google: gmapApi
        },
        mounted: function () {
            this.getMarkers();
            this.getLocationCircle();
            this.getLocationUsers();
        },
        methods: {
            getMarkers: function () {
                axios.get(`${this.$root.domain}/api/maps/allMarkers`)
                    .then((response) => {
                        this.markers = response.data.markers;
                        this.center = {
                            lat: this.markers[0].lat,
                            lng: this.markers[0].lng
                        };
                    });
            },
            okRemoveLocation: function (item) {
                axios.get(`${this.$root.domain}/api/admin/removeLocationCircle`, {
                    params: {
                        token: this.$root.user.token,
                        id: item.id
                    }
                }).then((response) => {
                    this.$root.viewNotify('success', 'Успешно', `Вы удалили локацию`);

                    this.locationCircle.splice(
                        this.locationCircle.indexOf(item),
                        1);
                });
            },

            getLocationCircle: function () {
                axios.get(`${this.$root.domain}/api/maps/allLocationCircle`)
                    .then((response) => {
                        this.locationCircle = response.data.locationCircle;
                    });
            },
            getLocationUsers: function () {
                axios.get(`${this.$root.domain}/api/maps/allLocationUsers`)
                    .then((response) => {
                        this.locationUsers = response.data.locationUsers;
                    });
            },
            addMarkerAction: function () {
                this.addMarkerFormActive = !this.addMarkerFormActive;
                this.addLocationFormActive = false;
            },
            addLocationAction: function () {
                this.addLocationFormActive = !this.addLocationFormActive;
                this.addMarkerFormActive = false;
            },
            choiseLocation: function (e) {
                if (this.addMarkerFormActive) {
                    this.addMarker = {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()
                    };
                    this.addMarkerForm.lat = e.latLng.lat();
                    this.addMarkerForm.lng = e.latLng.lng();

                    this.addMarkerForm.latLng = `X:${e.latLng.lng()} Y:${e.latLng.lat()}`;
                }

                if (this.addLocationFormActive) {
                    this.addLocationForm.lat = e.latLng.lat();
                    this.addLocationForm.lng = e.latLng.lng();
                    this.addLocationForm.radius = 10000;


                    this.addLocationForm.latLngRad = `Локация обозначена`;
                }

            },
            sendFormMarker: function () {
                if ((this.addMarkerForm.name) && (this.addMarkerForm.lat)) {
                    axios.get(`${this.$root.domain}/api/admin/sendMarker`, {
                        params: {
                            token: this.$root.user.token,
                            name: this.addMarkerForm.name,
                            lat: this.addMarkerForm.lat,
                            lng: this.addMarkerForm.lng,
                        }
                    })
                        .then((response) => {
                            this.$root.viewNotify('success', 'Успешно', 'Информация обновлена');
                        })
                        .catch((error) => {
                            this.$root.viewNotify('error', 'Ошибка', error);
                        })
                } else {
                    // if (!this.valid.username) {
                    //     this.status.username = 'error';
                    // }
                    // if (!this.valid.birthday) {
                    //     this.status.birthday = 'error';
                    // }
                    //
                    // this.status.button = 'error';
                    //
                    // this.$root.viewNotify('error','Ошибка', 'Поля должны быть заполнены');
                }
            },
            sendFormLocation: function () {
                if ((this.addLocationForm.name) && (this.addLocationForm.lat)) {
                    axios.get(`${this.$root.domain}/api/admin/sendLocationCircle`, {
                        params: {
                            token: this.$root.user.token,
                            name: this.addLocationForm.name,
                            radius: this.$refs.gmapcircle.$circleObject.radius,
                            lat: this.$refs.gmapcircle.$circleObject.center.lat(),
                            lng: this.$refs.gmapcircle.$circleObject.center.lng(),
                        }
                    })
                        .then((response) => {
                            this.$root.viewNotify('success', 'Успешно', 'Информация обновлена');
                            this.$router.push('/page/locations')
                        })
                        .catch((error) => {
                            this.$root.viewNotify('error', 'Ошибка', error);
                        })
                } else {
                    // if (!this.valid.username) {
                    //     this.status.username = 'error';
                    // }
                    // if (!this.valid.birthday) {
                    //     this.status.birthday = 'error';
                    // }
                    //
                    // this.status.button = 'error';
                    //
                    // this.$root.viewNotify('error','Ошибка', 'Поля должны быть заполнены');
                }
            }
        },
        watch: {}

    }
</script>

<style lang="less">
    #map, .vue-google-map {
        height: 500px;
    }

    .map-view {
        width: 100%;
        height: 500px;
        margin-bottom: 10px;
        overflow: hidden;
        border-radius: 5px;
    }

    .nav-locations {
        margin-bottom: 10px;
    }

    .form-add-location {
        margin-bottom: 10px;
        display: none;
        &.active {
            display: block;
        }
        & .form-control {
            margin-bottom: 10px;
        }
    }
</style>
