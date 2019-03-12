/**
 *
 * ListView
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ListView() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ListView.propTypes = {};

export default ListView;
