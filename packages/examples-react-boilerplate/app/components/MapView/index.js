/**
 *
 * MapView
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function MapView() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

MapView.propTypes = {};

export default MapView;
