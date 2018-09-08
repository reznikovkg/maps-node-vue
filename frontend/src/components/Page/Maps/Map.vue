<template>
    <div class="content">
        <GmapMap
                :center="{lat:10, lng:10}"
                :zoom="zoom"
                map-type-id="terrain"
                style="width: 100%; height: 500px"
        >
        </GmapMap>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Map",
        data () {
            return {
                map: null,
                markers: null,

                lat: null,
                lng: null,
                center: {lat: -34.397, lng: 150.644},
                zoom: 1

            }
        },
        mounted: function () {
            // this.initMap();
        },
        methods: {

        }

    }
</script>

<style lang="less">
    #map, .vue-google-map {
        height: 500px;
    }
</style>
