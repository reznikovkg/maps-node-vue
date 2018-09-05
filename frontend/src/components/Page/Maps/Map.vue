<template>
    <div class="content">
        <div id="map"></div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Map",
        data () {
            return {
                map: null,
                markers5: null,

                lat: null,
                lng: null

            }
        },
        mounted: function () {
            this.initMap();
            this.getMarkers();
        },
        methods: {
            initMap: function () {
                this.map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: 8
                });

                google.maps.event.addListener(this.map, 'click', (event) => {
                    console.log(event.latLng.lat());
                    this.lat = event.latLng.lat();
                    this.lng = event.latLng.lng();
                    var marker = new google.maps.Marker({
                        position: event.latLng,
                        map: this.map
                    });
                });
            },
            getMarkers: function () {
                axios.get(`${this.$root.domain}/api/maps/allMarkers`)
                    .then((response)=>{


                        this.markers5 = response.data.markers;

                        var markers = this.markers5;

                        markers.forEach((item, i, markers) => {
                            var uluru = {lat: item.lat, lng: item.lng};
                            var marker = new google.maps.Marker({position: uluru, map: this.map});
                        });



                    });
            },
        }

    }
</script>

<style lang="less">
    #map {
        height: 500px;
    }
</style>
