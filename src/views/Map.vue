<template>
  <div></div>
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  name: 'map',
  data: () => ({
    modalShow: false,
  }),
  methods: {
    // eslint-disable-next-line no-unused-vars
    reserveSelectedStreet() {
      /**
       * Code goes here to submit street to cart!
       *
       *
       *
       */
      // eslint-disable-next-line no-constant-condition
      if (true) {
        // modal popup
        this.$bvModal.show('street-confirmation-modal');
      }
    },
  },
  mounted() {
    const reserveSegment = {
      title: 'Reserve',
      id: 'reserve-this',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Checkmark.svg',
    };
    const template = {
      // autocasts as new PopupTemplate()
      title: '{ST_NAME} {ST_TYPE}', // Show attribute value
      content: '<b>ID:</b> {FID} <strong>RESERVED: {RESERVED}</strong>',
      actions: [reserveSegment],
    };
    const renderer = {
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#renderer
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-UniqueValueRenderer.html
      type: 'unique-value',
      field: 'ST_TYPE',
      defaultSymbol: { type: 'simple-line' },
      uniqueValueInfos: [{
        value: 'ST',
        symbol: {
          type: 'simple-line', // autocasts as new SimpleFillSymbol()
          color: 'blue',
          width: '3px',
        },
      }, {
        value: 'AVE',
        symbol: {
          type: 'simple-line', // autocasts as new SimpleFillSymbol()
          color: 'purple',
          width: '1px',
        },
      },
      ],
    };
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
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'], { css: true })
      .then(([ArcGISMap, MapView, FeatureLayer]) => {
        const map = new ArcGISMap({
          basemap: 'gray',
        });
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
          popupTemplate: template,
          // https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html
          // popupTemplate: template,
        });
        this.view.ui.add(selectFilter, 'bottom-right');
        function setFeatureLayerFilter(expression) {
          streetSegments.definitionExpression = expression;
        }
        selectFilter.addEventListener('change', (event) => {
          setFeatureLayerFilter(event.target.value);
        });
        map.add(streetSegments);
        // eslint-disable-next-line no-unused-vars
        // https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/index.html
        this.view.popup.on('trigger-action', (event) => {
          // Execute the measureThis() function if the measure-this action is clicked
          if (event.action.id === 'reserve-this') {
            this.reserveSelectedStreet();
          }
        });
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
div {
    padding: 0;
    margin: 0;
    width: 98vw;
    height: 85vh;
}
</style>
