/**
 *
 * HomeLayout
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import GeoJsonEditor from 'react-geojson-editor';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function HomeLayout() {
  console.log('GeoJsonEditor', GeoJsonEditor);

  return (
    <div>
      <GeoJsonEditor.GeoJsonEditor
        googleMapKey={process.env.GOOGLE_MAP_KEY}
        existingPolygons={null}
        center={{ lng: 0, lat: 0 }}
        zoom={3}
        mapHeight={700}
        onSave={
          (/* geojson, area */) => {
            /* Ex: save updated geojson to the backend */
          }
        }
      />
    </div>
  );
}

HomeLayout.propTypes = {};

export default HomeLayout;
