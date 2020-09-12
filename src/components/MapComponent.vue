<template>
  <div id="map-component">
    <b-button class="label" type="submit" @click="showLabels">
      {{`${(this.labelsVisible ? "Hide" : "Show")} Block Numbers`}}
    </b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { loadModules } from 'esri-loader';
import mapConstants from '../constants/mapConstants';

export default {
  name: 'mapComponent',
  props: {
    reservedFilter: {
      type: Number,
      required: false,
    },

    pushBlock: {
      type: Function,
      required: false,
    },

    activeBlockId: {
      type: String,
      required: false,
    },

    isAdminMap: {
      type: Boolean,
      required: false,
    },
  },

  data: () => ({
    labelsVisible: true,
  }),

  computed: {
    ...mapState({
      reservedBlocks: 'reservedBlocks',
    }),

    // Determines which blocks to display depending on the user is looking at
    // reserve new blocks, current reservations, or admin map
    blockFilter() {
      if (this.isAdminMap) {
        // Admins can see all current reserved blocks by any user
        return 'RESERVED = 1 OR RESERVED = 2';
      } if (this.reservedFilter === 0) {
        // If reserving new blocks, only show blocks that are not reserved
        return 'RESERVED = 0';
      } if (this.reservedBlocks.length > 0) {
        // If there are given IDs, have the map only show the given blocks
        return `ID = ${this.reservedBlocks.join(' OR ID = ')} AND RESERVED = 1`;
      }
      // Will not display any blocks
      return '1=0';
    },

    // The content of the popup when clicking on a block
    // https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html
    blockPopupTemplate() {
      return {
        // autocasts as new PopupTemplate()
        title: '{ID}', // Show attribute value
        content: this.reservationToString,
        outFields: ['*'],
        actions: this.blockActions,
      };
    },

    // Sets whether a user can reserve, release, or complete a block depending
    // on which map screen they are viewing
    blockActions() {
      if (this.reservedFilter === 0) {
        return [mapConstants.ADD_TO_RESERVE];
      }
      return [mapConstants.ADD_TO_RELEASE, mapConstants.ADD_TO_COMPLETE];
    },

    // contains the information about each of the blocks, each block is a feature.
    // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
    blockLayerObject() {
      return {
        title: 'blocks',
        url: process.env.VUE_APP_ARCGIS_URL,
        renderer: mapConstants.BLOCK_RENDERER,
        popupTemplate: this.blockPopupTemplate,
        labelingInfo: [mapConstants.BLOCK_LABEL],
        labelsVisible: this.labelsVisible,
        definitionExpression: this.blockFilter,
      };
    },

    // contains the information about the private streets
    // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
    privateStreetLayerObject() {
      return {
        title: 'private',
        url: process.env.VUE_APP_PRIVATE_STREETS_URL,
        renderer: mapConstants.PRIVATE_STREET_RENDERER,
      };
    },
  },

  methods: {
    showLabels() {
      this.labelsVisible = !this.labelsVisible;
    },

    // Converts the reservation status to a string for the popup
    reservationToString(feature) {
      let reserveString = 'Open';
      if (feature.graphic.attributes.RESERVED === 1) {
        reserveString = 'Reserved';
      } else if (feature.graphic.attributes.RESERVED === 2) {
        reserveString = 'Complete';
      }
      return `<strong>Status:</strong> ${reserveString}`;
    },

    loadMap() {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/widgets/Locate'], { css: true })
        .then(([ArcGISMap, MapView, FeatureLayer, Locate]) => {
          const map = new ArcGISMap({
            basemap: 'satellite',
          });

          // Main object with information about the map display
          // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
          this.view = new MapView({
            container: this.$el,
            map,
            center: [-71.0640, 42.3554], // Boston Common
            zoom: 13.5,
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
            },
          });

          // Converting layer objects to ArcGIS featureLayers so they can be
          // interpreted by the MapView
          const blockLayer = new FeatureLayer(this.blockLayerObject);
          map.add(blockLayer);
          const privateStreetLayer = new FeatureLayer(this.privateStreetLayerObject);
          map.add(privateStreetLayer);

          // Button that centers map over users current location
          // https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html
          const locate = new Locate({
            view: this.view,
            useHeadingEnabled: false,
            goToOverride: (view, options) => view.goTo(options.target),
          });
          this.view.ui.add(locate, 'top-left');

          // Opens a popup with the block information that corresponds with the activeBlockId
          this.view.when(() => {
            if (this.activeBlockId !== undefined) {
            // Create a query where the ID equals the given ID
              const query = blockLayer.createQuery();
              query.where = `ID = ${this.activeBlockId}  AND RESERVED = 1`;
              blockLayer.queryFeatures(query)
                .then((response) => {
                // ID is a key so there should only be one item in the
                // features array that is returned
                  const blockFeatures = response.features;
                  // Sets what the popup should look like
                  if (blockFeatures.length > 0) {
                    blockFeatures[0].popupTemplate = this.blockPopupTemplate;
                  }
                  this.view.popup.open({
                    features: blockFeatures,
                  });
                });
            }
          });

          // Hides the completed block action when a block is completed
          this.view.popup.watch('selectedFeature', (graphic) => {
            if (graphic) {
              const graphicTemplate = graphic.getEffectivePopupTemplate();
              if (graphic.attributes.RESERVED === 2) {
                graphicTemplate.actions.items[1].visible = false;
              } else if (graphic.attributes.RESERVED === 1) {
                graphicTemplate.actions.items[1].visible = true;
              }
            }
          });

          // Determine to which list the block in the popup will be added
          // https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/index.html
          this.view.popup.on('trigger-action', (event) => {
          // Execute the measureThis() function if the measure-this action is clicked
          // If the event id matches one of the ids defined as an action for selecting a block
          // then add to the list with a corresponding id
            if (event.action.id === 'reserve'
            || event.action.id === 'release'
            || event.action.id === 'complete') {
              this.pushBlock(this.view.popup.selectedFeature.attributes.ID, event.action.id);
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
  button.label, button.label:hover, button.label:focus {
    position: absolute;
    z-index: 100;
    right: 5px;
    top: 5px;
    float: right;
    background: #9AC356;
    color: white;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
</style>
