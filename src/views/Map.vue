<template>
  <div></div>
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  name: 'map',
  props: {
    reservedFilter: {
      type: Number,
      required: false,
      // currentSelection:
    },
    pushStreet: {
      type: Function,
      required: false,
    },
    fids: {
      type: Array,
      required: false,
    },
  },
  data: () => ({
    modalShow: false,
  }),
  mounted() {
    const reserveSegment = {
      title: 'Add',
      id: 'reserve',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Checkmark.svg',
    };
    const unreserveSegment = {
      title: 'Remove',
      id: 'unreserve',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Checkmark.svg',
    };
    const completeSegment = {
      title: 'Complete',
      id: 'complete',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Checkmark.svg',
    };
    function getModalContent() {
      // const reserved = '{RESERVED}' === '0' ? 'Open' : 'Reserved';
      // TODO: find way to perform function on ESRI data;
      return '<b>ID:</b> {FID} <strong>RESERVED:</strong> {RESERVED}';
    }
    const actions = [];
    if (this.reservedFilter === 1) {
      actions.push(unreserveSegment, completeSegment);
    } else {
      actions.push(reserveSegment);
    }
    const template = {
      // autocasts as new PopupTemplate()
      title: '{ST_NAME} {ST_TYPE}', // Show attribute value
      content: getModalContent(),
      actions,
    };
    const renderer = {
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#renderer
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-UniqueValueRenderer.html
      type: 'unique-value',
      field: 'RESERVED',
      defaultSymbol: { type: 'simple-line' },
      uniqueValueInfos: [{
        value: '0',
        symbol: {
          type: 'simple-line', // autocasts as new SimpleFillSymbol()
          color: '#9AC356',
          width: '3px',
        },
      }, {
        value: '1',
        symbol: {
          type: 'simple-line', // autocasts as new SimpleFillSymbol()
          color: '#787272',
          width: '3px',
        },
      },
      ],
    };
    const sqlExpressions = [];
    // Creates a filter from the given list of FIDs so that only the given
    // streets will appear on the map
    const reservedFidsFilter = `FID = ${this.fids.join(' OR FID = ')}`;
    if (this.reservedFilter === 0) {
      // If reserving new streets, only show streets that are not reserved
      sqlExpressions.push(`RESERVED = ${this.reservedFilter}`);
    } else if (this.fids.length > 0) {
      // If there are given FIDs, have the map only show the given streets
      sqlExpressions.push(reservedFidsFilter);
    } else {
      // Otherwise have default filters which show every street in the database (temporary)
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
        const map = new ArcGISMap({
          basemap: 'gray',
        });
        this.view = new MapView({
          container: this.$el,
          map,
          center: [-71.0892, 42.3398],
          zoom: 15,
          popup: {
            dockEnabled: true,
            dockOptions: {
              // Disables the dock button from the popup
              buttonEnabled: false,
              // Ignore the default sizes that trigger responsive docking
              breakpoint: false,
              // Set position of modal to bottom of the map
              position: 'bottom-center',
            },
            // Condition to display
            // visible: !!props.currentSelection
          },
        });
        const streetSegments = new FeatureLayer({
          url: 'https://services7.arcgis.com/iIw2JoTaLFMnHLgW/ArcGIS/rest/services/boston_street_segments_1/FeatureServer/0',
          renderer,
          outFields: ['ST_NAME'],
          popupTemplate: template,
          // https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html
          // popupTemplate: template,
        });
        this.view.ui.add(selectFilter, 'bottom-right');
        streetSegments.definitionExpression = selectFilter.firstChild.value;
        function setFeatureLayerFilter(expression) {
          streetSegments.definitionExpression = expression;
        }
        selectFilter.addEventListener('change', (event) => {
          setFeatureLayerFilter(event.target.value);
        });
        map.add(streetSegments);
        // eslint-disable-next-line no-unused-vars
        // Determine to which list the street in the popup will be added
        // https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/index.html
        this.view.popup.on('trigger-action', (event) => {
          // Execute the measureThis() function if the measure-this action is clicked
          // If the event id matches one of the ids defined as an action for selecting a street
          // then add to the list with a corresonding id
          if (event.action.id === 'reserve' || event.action.id === 'unreserve' || event.action.id === 'complete') {
            this.pushStreet(event.target.selectedFeature.attributes.FID, event.action.id);
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

<style lang='scss' scoped>
div {
    padding: 0;
    margin: 0;
    width: 98vw;
    height: 85vh;
}
</style>
