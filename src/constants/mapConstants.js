// The action button to add a block to the reserve list
const ADD_TO_RESERVE = {
  title: 'Add',
  id: 'reserve',
  image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Checkmark.svg',
};

// The action button to add a block to the release list
const ADD_TO_RELEASE = {
  title: 'Release',
  id: 'release',
  image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Checkmark.svg',
};

// The action button to add a block to the complete list
const ADD_TO_COMPLETE = {
  title: 'Complete',
  id: 'complete',
  image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Checkmark.svg',
};

// Sets the colors of blocks based on their reservation status
const BLOCK_RENDERER = {
  // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#renderer
  // https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-UniqueValueRenderer.html
  type: 'unique-value',
  field: 'RESERVED',
  defaultSymbol: { type: 'simple-fill' },
  uniqueValueInfos: [
    {
      value: '0',
      symbol: {
        type: 'simple-fill', // autocasts as new SimpleFillSymbol()
        color: 'rgba(195, 195, 195, 0.5)', // light grey
      },
    }, {
      value: '1',
      symbol: {
        type: 'simple-fill', // autocasts as new SimpleFillSymbol()
        color: 'rgba(240, 240, 30, 0.5)', // yellow
      },
    },
    {
      value: '2',
      symbol: {
        type: 'simple-fill', // autocasts as new SimpleFillSymbol()
        color: 'rgba(134, 195, 86, 0.5)', // light green
      },
    },
  ],
};

// Sets the color of the marked private streets
const PRIVATE_STREET_RENDERER = {
  type: 'simple',
  symbol: {
    type: 'simple-line',
    color: 'rgba(200, 0, 0, 1)', // red
    width: 2,
  },
};

// The optional labels of the blocks on the map
const BLOCK_LABEL = {
  labelExpressionInfo: { expression: '$feature.ID' }, // ArcGIS reads the block ID
  symbol: {
    type: 'text',
    color: 'black',
    haloSize: 1,
    haloColor: 'white',
  },
};

export default {
  ADD_TO_RESERVE,
  ADD_TO_RELEASE,
  ADD_TO_COMPLETE,
  BLOCK_RENDERER,
  PRIVATE_STREET_RENDERER,
  BLOCK_LABEL,
};
