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
  },
  data: () => ({
    modalShow: false,
  }),
  methods: {
    unreserveSelectedStreet(street) {
      /**
       * TODO
       * Code goes here to submit street as unreserved!
       *
       *
       *
       */
      this.pushStreet(street);
      // eslint-disable-next-line no-constant-condition
      if (true) {
        // modal popup
        this.$bvModal.show('street-unreserve-modal');
      }
    },
    completeSelectedStreet(street) {
      /**
       * TODO
       * Code goes here to submit street as completed!
       *
       */
      this.pushStreet(street);
      // eslint-disable-next-line no-constant-condition
      if (true) {
        // modal popup
        this.$bvModal.show('street-completed-modal');
      }
    },
  },
  mounted() {
    const reserveSegment = {
      title: 'Add',
      id: 'reserve-this',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Checkmark.svg',
    };
    const unreserveSegment = {
      title: 'Remove',
      id: 'unreserve-this',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Checkmark.svg',
    };
    const completeSegment = {
      title: 'Complete',
      id: 'complete-this',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Checkmark.svg',
    };
    function getModalContent() {
      // const reserved = '{RESERVED}' === '0' ? 'Open' : 'Reserved';
      // TODO: find way to perform function on ESRI data;
      return '<b>ID:</b> {FID} <strong>RESERVED:</strong> {RESERVED}';
    }
    const actions = [];
    if (this.reservedFilter === 1) {
      actions.push([unreserveSegment, completeSegment]);
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
          outFields: ['FID', 'ST_NAME'],
          popupTemplate: template,
          // https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html
          // popupTemplate: template,
        });
        this.view.ui.add(selectFilter, 'bottom-right');
        if (this.reservedFilter !== undefined) {
          streetSegments.definitionExpression = selectFilter.firstChild.value;
        }
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
            this.pushStreet(event.target.selectedFeature.attributes.FID);
          }
          // else if (event.action.id === 'unreserve-this') {
          //   this.unreserveSelectedStreet(getStreet());
          // } else if (event.action.id === 'complete-this') {
          //   this.completeSelectedStreet(getStreet());
          // }
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
