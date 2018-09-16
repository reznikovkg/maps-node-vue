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

            <!--локации прямоуг-->
            <gmap-rectangle
                    @click="mapClick"
                    v-for="(locRectangle, index) in locationRectangle"
                    :bounds="{
                        south: locRectangle.south,
                        north: locRectangle.north,
                        west: locRectangle.west,
                        east: locRectangle.east
                    }"></gmap-rectangle>


            <GmapMarker
                    v-if="choiseCoordMark"
                    :position="{ lat: addMarker.lat, lng: addMarker.lng}"/>
        </GmapMap>

        <div class="location-control">
            <h3>Ваша локация</h3>
            <form action="">
                <div class="form-control">
                    <at-input v-model="coordsInput" placeholder="Ваши координаты" append-button disabled>
                        <template slot="append">
                            <span @click="autoCoord">Авто</span>
                        </template>
                    </at-input>
                </div>
                <div class="form-control">
                    <gmap-place-input :default-place="place"
                                      :class="{ 'at-input at-input--success' : valid.place, 'at-input at-input--error' : !valid.place }"
                                      className="at-input__original"
                                      placeholder="Введите Ваше местоположение"
                                      @place_changed="setPlace">
                    </gmap-place-input>
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
                center: {
                    lat: -34.397,
                    lng: 150.644
                },
                zoom: 2,

                locationCircle: {},
                locationRectangle: {},
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

                place: '',
                latLng: {},
                valid: {
                    place: true
                }
            }
        },
        computed: {
            google: gmapApi
        },
        mounted: function () {
            this.getLocationCircle();
            this.getLocationRectangle();
            this.getLocationUser();
        },
        methods: {
            getLocationCircle: function () {
                axios.get(`${this.$root.domain}/api/maps/allLocationCircle`)
                    .then((response) => {
                        this.locationCircle = response.data.locationCircle;

                        if (this.locationCircle.length !== 0) {
                            this.center = {
                                lat: this.locationCircle[0].lat,
                                lng: this.locationCircle[0].lng,
                            }
                        }
                    });
            },
            getLocationRectangle: function () {
                axios.get(`${this.$root.domain}/api/maps/allLocationRectangle`)
                    .then((response) => {
                        this.locationRectangle = response.data.locationRectangle;
                    });
            },
            getLocationUser: function () {
                axios.get(`${this.$root.domain}/api/maps/getLocationUser`, {
                    params: {
                        id: this.$root.user.id,
                    }
                })
                    .then((response) => {
                        var locationUser = response.data.locationUser;

                        this.choiseCoordMark = true;
                        this.addMarker.lat = locationUser.lat;
                        this.addMarker.lng = locationUser.lng;
                        this.coordsInput = `X:${this.addMarker.lng} Y:${this.addMarker.lat}`;
                    });
            },

            autoCoord: function () {
                console.log('setAuto');
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        this.addMarker.lat = position.coords.latitude;
                        this.addMarker.lng = position.coords.longitude;
                        console.log('setAutoOk');
                    });

                } else {
                    this.$Notify({
                        title: 'Ошибка',
                        message: 'Вы не включили геолокацию',
                        type: 'error'
                    })
                }

                this.isValid();
            },
            sendCoord: function () {
                this.isValid();

                if (this.valid.place) {
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
                } else {
                    this.$Notify({
                        title: 'Ошибка',
                        message: 'Выбранное местоположение не входит в допустимы локации',
                        type: 'error'
                    })
                }
            },
            mapClick: function (e) {
                if (this.choiseCoordMark) {
                    this.addMarker.lat = e.latLng.lat();
                    this.addMarker.lng = e.latLng.lng();

                    this.coordsInput = `X:${this.addMarker.lng} Y:${this.addMarker.lat}`;
                    this.isValid();
                }
            },
            setPlaceText: function (place) {
                this.place = place;
            },
            setPlace: function (place) {
                this.addMarker = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                this.coordsInput = `X:${this.addMarker.lng} Y:${this.addMarker.lat}`;
                this.valid.place = false;
                this.isValid();
            },
            isValid: function () {
                this.valid.place = false;
                var choiuceLoc = new google.maps.LatLng(this.addMarker.lat, this.addMarker.lng);
                var locs = this.locationCircle;

                locs.forEach((item, i, locs) => {
                    var locItem = new google.maps.LatLng(item.lat, item.lng);

                    var dist = google.maps.geometry.spherical.computeDistanceBetween(choiuceLoc, locItem);
                    if (dist < item.radius) {
                        this.valid.place = true;
                    }
                });

                if (!this.valid.place) {
                    var recs = this.locationRectangle;

                    recs.forEach((item, i, recs) => {

                        if (
                            (this.addMarker.lat < item.north) &&
                            (this.addMarker.lat > item.south) &&
                            (this.addMarker.lng > item.west) &&
                            (this.addMarker.lng < item.east)
                        ) {
                            this.valid.place = true;
                        }
                    });
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
