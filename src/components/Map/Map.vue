<template>
    <div class='map'></div>
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  name: 'map',
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'], { css: true })
      .then(([ArcGISMap, MapView, FeatureLayer]) => {
        const map = new ArcGISMap({
          basemap: 'topo-vector',
        });
        const renderer = {
          type: 'unique-value',
          field: 'ST_TYPE',
          defaultSymbol: { type: 'simple-line' },
          uniqueValueInfos: [{
            // All features with value of "North" will be blue
            value: 'ST',
            symbol: {
              type: 'simple-line', // autocasts as new SimpleFillSymbol()
              color: 'blue',
              width: '3px',
            },
          }, {
            // All features with value of "East" will be green
            value: 'AVE',
            symbol: {
              type: 'simple-line', // autocasts as new SimpleFillSymbol()
              color: 'purple',
              width: '1px',
            },
          },
          ],
        };
        this.view = new MapView({
          container: this.$el,
          map,
          center: [-71.0892, 42.3398],
          zoom: 15,
        });
        const streetSegments = new FeatureLayer({
          url: 'https://services7.arcgis.com/iIw2JoTaLFMnHLgW/ArcGIS/rest/services/boston_street_segments_1/FeatureServer/0',
          renderer,
          outFields: ['SEGMENT_ID', 'ST_NAME'],
          // https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html
          // popupTemplate: template,
        });
        map.add(streetSegments);
      });
  },
  // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#refresh
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  },
};

</script>

<style scoped>
.map {
  width: 100vw;
  height: 100vh;
}
</style>
