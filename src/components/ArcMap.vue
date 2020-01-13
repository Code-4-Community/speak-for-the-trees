<template>
  <div id='map'></div>
</template>

<script>
// Future Implementation:
// * Users can register events until they reach a max/min of total 'street length'
//   this standardizes that each volunteer does similar amounts of work.

import { loadModules } from 'esri-loader';
// import { expression } from '@babel/template';

export default {
  /* eslint-disable no-alert, no-unused-vars */
  name: 'ArcMap',
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    const reserveSegment = {
      title: 'Reserve',
      id: 'reserve-this',
      image: 'https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/live/Measure_Distance16.png',
    };
    const template = {
      // autocasts as new PopupTemplate()
      title: '{ST_NAME} {ST_TYPE}', // Show attribute value
      content: '<b>ID:</b> {SEGMENT_ID} <br><b>Length:</b> {SHAPElen} ft<br><b>Available?</b> Yes<br><b>Last Observered:</b> August 17, 2018',
      actions: [reserveSegment],
    };
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/layers/GraphicsLayer',
      'esri/Graphic'],
    { css: true }).then(([ArcGISMap, MapView, FeatureLayer, GraphicsLayer]) => {
      const map = new ArcGISMap({
        basemap: 'topo-vector',
      });
      this.view = new MapView({
        container: this.$el,
        map,
        center: [-71.0892, 42.3398],
        zoom: 15,
      });
      const streetSegments = new FeatureLayer({
        url: 'https://services1.arcgis.com/KUeKSLlMUcWvuPRM/arcgis/rest/services/Boston_Street_Segments/FeatureServer',
        renderer: {
          type: 'simple',
          symbol: {
            type: 'simple-line',
            color: 'green',
            width: '1px',
          },
        },
        outFields: ['SEGMENT_ID', 'ST_NAME'],
        // https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html
        popupTemplate: template,
      });
      // https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/index.html
      this.view.popup.on('trigger-action', (event) => {
        if (event.action.id === 'reserve-this') {
          // store.commit('addStreetReservation', event);
        }
      });
      // https://developers.arcgis.com/labs/javascript/filter-a-feature-layer/
      const sqlExpressions = ['*', "ST_TYPE = 'ST'", "ST_TYPE = 'AVE'", "ST_TYPE = 'PL'"];
      const selectFilter = document.createElement('select');
      selectFilter.setAttribute('class', 'esri-widget esri-select');
      selectFilter.setAttribute('style', 'width: 275px; font-family: Avenir Next W00; font-size: 1em');
      sqlExpressions.forEach((sql) => {
        const option = document.createElement('option');
        option.value = sql;
        option.innerHTML = sql;
        selectFilter.appendChild(option);
      });
      this.view.ui.add(selectFilter, 'bottom-right');
      function setFeatureLayerFilter(expression) {
        streetSegments.definitionExpression = expression;
      }
      selectFilter.addEventListener('change', (event) => {
        setFeatureLayerFilter(event.target.value);
      });

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      map.add(streetSegments);
    });
  },
  handleRegister() {
    // console.log('hit');
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
