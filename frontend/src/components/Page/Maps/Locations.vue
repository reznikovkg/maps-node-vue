<template>
    <div class="content">
        <GmapMap
                :center="center"
                :zoom="zoom"
                map-type-id="terrain"
                class="map-view"
        >
            <GmapMarker
                    v-for="(marker, index) in markers"
                    :key="index"
                    :position="{ lat: marker.lat, lng: marker.lng}"
                    :label="marker.id.toString()"
            />
        </GmapMap>

        <at-table
                :columns="tableStruct"
                :data="markers"
                size="small"
                sort
        ></at-table>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Locations",
        data () {
            return {
                map: null,
                markers: [],
                center: {lat: -34.397, lng: 150.644},
                zoom: 5,

                tableStruct: [
                    {
                        title: 'id',
                        key: 'id',
                        sortType: 'normal'
                    },
                    {
                        title: 'Название',
                        key: 'name',
                        sortType: 'normal'
                    },
                ],
                lat: null,
                lng: null,
            }
        },
        mounted: function () {
            this.getMarkers();
        },
        methods: {
            getMarkers: function () {
                axios.get(`${this.$root.domain}/api/maps/allMarkers`)
                    .then((response)=>{

                        this.markers = response.data.markers;

                        this.center = {
                            lat: this.markers[0].lat,
                            lng: this.markers[0].lng
                        }
                    });
            },
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
        /*margin-bottom: 10px;*/
        /*overflow: hidden;*/
        /*border-radius: 5px;*/
    }
</style>
