<template>
    <div class="content">
        <GmapMap
                :center="center"
                :zoom="zoom"
                map-type-id="terrain"
                class="map-view"
        >
            <gmap-circle
                    @click="mapClick"
                    v-for="(locCircle, index) in locationCircle"
                    :key="locCircle.id"
                    :center="{lat:locCircle.lat, lng:locCircle.lng}"
                    :radius="locCircle.radius"
                    :options="{editable: false}"
                    @radius_changed="updateCircle('radius', $event)"
                    @bounds_changed="updateCircle('bounds', $event)"></gmap-circle>

            <GmapMarker
                    v-if="choiseCoordMark"
                    :position="{ lat: addMarker.lat, lng: addMarker.lng}"/>
        </GmapMap>

        <div class="location-control">
            <h3>Ваша локация</h3>
            <form action="">
                <div class="form-control">
                    <at-input v-model="coordsInput" placeholder="Ваши координаты" append-button prepend-button disabled>
                        <template slot="prepend">
                            <span @click="chooseCoord">Указать</span>
                        </template>

                        <template slot="append">
                            <span @click="autoCoord">Авто</span>
                        </template>
                    </at-input>
                </div>
                <div>
                    <at-button
                            v-if="addMarker.lat"
                            @click="sendCoord"
                            type="primary"
                            size="small">Сохранить
                    </at-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {gmapApi} from 'vue2-google-maps'

    export default {
        name: "Locations",
        data() {
            return {
                map: null,
                markers: [],
                center: {lat: -34.397, lng: 150.644},
                zoom: 2,

                locationCircle: {},
                locationUser: '',
                choiseCoordMark: false,
                addMarker: {
                    lat: '',
                    lng: ''
                },
                coordsInput: '',
                pointUser: {
                    lat: '',
                    lng: ''
                },
                distance: 0,

                lat: null,
                lng: null,
            }
        },
        computed: {
            google: gmapApi
        },
        mounted: function () {
            this.getLocationCircle();
            this.getLocationUser();
        },
        methods: {
            getLocationCircle: function () {
                axios.get(`${this.$root.domain}/api/maps/allLocationCircle`)
                    .then((response) => {
                        this.locationCircle = response.data.locationCircle;

                        this.center = {
                            lat: this.locationCircle[0].lat,
                            lng: this.locationCircle[0].lng,
                        }
                    });
            },
            getLocationUser: function () {
                axios.get(`${this.$root.domain}/api/maps/getLocationUser`, {
                    params: {
                        id: this.$root.user.id,
                    }
                })
                    .then((response) => {
                        this.locationUser = response.data.locationUser;


                        this.choiseCoordMark = true;
                        this.addMarker.lat = this.locationUser.lat;
                        this.addMarker.lng = this.locationUser.lng;
                        this.coordsInput = `X:${this.addMarker.lng} Y:${this.addMarker.lat}`;

                    });
            },

            autoCoord: function () {
                // this.cen1 = new google.maps.LatLng(this.cen1.lat, this.cen1.lng)
                // this.cen2 = new google.maps.LatLng(this.cen2.lat, this.cen2.lng)
                //
                // this.distance = google.maps.geometry.spherical.computeDistanceBetween(this.cen1, this.cen2)
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        this.pointUser.lat = position.coords.latitude;
                        this.pointUser.lng = position.coords.longitude;
                        console.log(position);
                    });
                } else {
                    this.$Notify({
                        title: 'Ошибка',
                        message: 'Вы не включили геолокацию',
                        type: 'error'
                    })
                }
            },
            chooseCoord: function () {
                this.choiseCoordMark = true;
            },
            sendCoord: function () {
                axios.get(`${this.$root.domain}/api/maps/setLocationPoint`, {
                    params: {
                        token: this.$root.user.token,
                        id: this.$root.user.id,
                        lat: this.addMarker.lat,
                        lng: this.addMarker.lng,
                    }
                })
                    .then((response) => {
                        this.$Notify({
                            title: 'Успешно',
                            message: 'Вы сменили локацию',
                            type: 'success'
                        })
                    });
            },
            mapClick: function (e) {
                if (this.choiseCoordMark) {
                    this.addMarker.lat = e.latLng.lat();
                    this.addMarker.lng = e.latLng.lng();

                    this.coordsInput = `X:${this.addMarker.lng} Y:${this.addMarker.lat}`;
                }
            }
        }

    }
</script>

<style lang="less">
    #map, .vue-google-map {
        height: 500px;
    }

    .map-view {
        width: 100%;
        height: 500px;
    }

    .location-control {
        & h3 {
            margin-top: 10px;
        }

        & form {
            & .form-control {
                margin-bottom: 10px;
            }
        }
    }
</style>
