<template>
    <div class="content">
        <div id="map"></div>

        <button type="submit" @click="getMarkers">go</button>
        <!-- Replace the value of the key parameter with your own API key. -->
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Map",
        data () {
            return {
                map: null,
                markers5: null
            }
        },
        mounted: function () {
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            });
        },
        methods: {
            getMarkers: function () {
                axios.get(`${this.$root.domain}/api/maps/allMarkers`)
                    .then((response)=>{
                        this.markers5 = response.data.markers;
                    });
            }
        }

    }
</script>

<style lang="less">
    #map {
        height: 500px;
    }
</style>
