<template>
  <div></div>
</template>

<script>
import { mapState } from 'vuex';
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
    activeStreetId: {
      type: String,
      required: false,
    },
    labelsVisible: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    modalShow: false,
  }),
  computed: {
    ...mapState({
      reservedBlocks: 'reservedBlocks',
    }),
  },
  methods: {
    loadMap() {
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
        return '<b>ID:</b> {ID} <strong>RESERVED:</strong> {RESERVED}';
      }
      const actions = [];
      if (this.reservedFilter === 1) {
        actions.push(unreserveSegment, completeSegment);
      } else {
        actions.push(reserveSegment);
      }
      const template = {
      // autocasts as new PopupTemplate()
        title: '{ID}', // Show attribute value
        content: getModalContent(),
        actions,
      };
      const blockLabel = {
        labelExpressionInfo: { expression: '$feature.ID' },
        symbol: {
          type: 'text',
          color: 'black',
          haloSize: 1,
          haloColor: 'white',
        },
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
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: 'rgba(154, 195, 86, 0.5)',
          },
        }, {
          value: '1',
          symbol: {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: 'rgba(120, 114, 114, 0.5)',
          },
        },
        {
          value: '2',
          symbol: {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: '#186221',
          },
        },
        ],
      };
      const privateRenderer = {
        type: 'simple',
        symbol: {
          type: 'simple-line',
          color: 'rgba(200, 0, 0, 1)',
          width: 2,
        },
      };
      let sqlExpression = '1=0';
      // Creates a filter from the given list of IDs so that only the given
      // streets will appear on the map
      const reservedIdsFilter = `ID = ${this.reservedBlocks.join(' OR ID = ')}`;
      if (this.reservedFilter === 0) {
      // If reserving new streets, only show streets that are not reserved
        sqlExpression = `RESERVED = ${this.reservedFilter}`;
      } else if (this.reservedBlocks.length > 0) {
      // If there are given IDs, have the map only show the given streets
        sqlExpression = reservedIdsFilter;
      }
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
            title: 'blocks',
            url: process.env.VUE_APP_ARCGIS_URL,
            renderer,
            outFields: ['BLOCK'],
            popupTemplate: template,
            labelingInfo: [blockLabel],
            labelsVisible: this.labelsVisible,
          // https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html
          // popupTemplate: template,
          });
          const privateStreets = new FeatureLayer({
            title: 'private',
            url: process.env.VUE_APP_PRIVATE_STREETS_URL,
            renderer: privateRenderer,
          });
          streetSegments.definitionExpression = sqlExpression;
          map.add(streetSegments);
          map.add(privateStreets);
          // Opens a popup with the street information that corresponds with the given FID
          this.view.when(() => {
            if (this.activeStreetId !== undefined) {
            // Create a query where the ID equals the given ID
              const query = streetSegments.createQuery();
              query.where = `ID = ${this.activeStreetId}`;
              streetSegments.queryFeatures(query)
                .then((response) => {
                // ID is a key so there should only be one item in the
                // features array that is returned
                  const streetFeatures = response.features;
                  // Sets what the popup should look like
                  streetFeatures[0].popupTemplate = template;
                  this.view.popup.open({
                    features: streetFeatures,
                  });
                });
            }
          });
          // eslint-disable-next-line no-unused-vars
          // Determine to which list the street in the popup will be added
          // https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/index.html
          this.view.popup.on('trigger-action', (event) => {
          // Execute the measureThis() function if the measure-this action is clicked
          // If the event id matches one of the ids defined as an action for selecting a street
          // then add to the list with a corresponding id
            if (event.action.id === 'reserve'
            || event.action.id === 'unreserve'
            || event.action.id === 'complete') {
              this.pushStreet(event.target.selectedFeature.attributes.ID, event.action.id);
            }
          });
        });
    },
  },
  mounted() {
    this.$store.dispatch('getReservedBlocks');
    this.loadMap();
  },
  // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#refresh
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  },
  watch: {
    reservedBlocks() {
      this.loadMap();
    },
    reservedFilter() {
      this.loadMap();
    },
    labelsVisible() {
      this.loadMap();
    },
  },
};

</script>

<style lang='scss' scoped>

</style>
