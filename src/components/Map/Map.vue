<template>
    <div class='map'></div>
</template>

<script>
import { loadModules, Editor } from 'esri-loader';

export default {
  name: 'map',
  props: {
    reservedFilter: {
      type: Number,
      required: false,
    },
  },
  mounted() {
    const reserveSegment = {
      title: 'Reserve',
      id: 'reserve-this',
      image: 'https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/live/Measure_Distance16.png',
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
    const sqlExpressions = [];
    if (this.reservedFilter !== undefined) {
      sqlExpressions.push(`RESERVED = ${this.reservedFilter}`);
    } else {
      sqlExpressions.push('1=1', "ST_TYPE = 'ST'", "ST_TYPE = 'AVE'", "ST_TYPE = 'PL'");
    }
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
        console.log(this.reservedFilter);
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
        const reserveEditor = new Editor({
          view: this.view,
          container: document.createElement('div'),
          allowedWorkflows: ['update'],
          layerInfos: [
            {
              layer: streetSegments,
              fieldConfig: [
                {
                  name: 'reserve',
                  label: 'Reserve Block?',
                  editable: true,
                },
              ],
            },
          ],
        });
        function reserveThis() {
          if (!reserveEditor.viewModel.activeWorkflow) {
            this.view.popup.visible = false;
            reserveEditor.startUpdateWorkflowAtFeatureEdit(
              this.view.popup.selectedFeature,
            );
            this.view.ui.add(reserveEditor, 'top-right');
          }
        }
        this.view.popup.on('trigger-action', (event) => {
          if (event.action.id === 'reserve-this') {
            reserveThis();
          }
        });
        this.view.ui.add(selectFilter, 'bottom-right');
        if (this.reservedFilter !== undefined) {
          console.log(selectFilter.firstChild);
          streetSegments.definitionExpression = selectFilter.firstChild.value;
        }
        function setFeatureLayerFilter(expression) {
          streetSegments.definitionExpression = expression;
        }
        selectFilter.addEventListener('change', (event) => {
          setFeatureLayerFilter(event.target.value);
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
  margin-left: 15%;
  width: 70vw;
  height: 70vh;
}
</style>
