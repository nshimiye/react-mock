/**
 *
 * SlangRegion
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSlangRegion from './selectors';
import reducer from './reducer';
import saga from './saga';

// import messages from './messages';
import HomeLayout from '../../components/HomeLayout';
import { fetchSlangList } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class SlangRegion extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSlangList());
  }

  render() {
    console.log('[Slang data]', this.props.slangRegion);
    return (
      <div>
        <Helmet>
          <title>SlangRegion</title>
          <meta name="description" content="Description of SlangRegion" />
        </Helmet>
        <HomeLayout />
      </div>
    );
  }
}

SlangRegion.propTypes = {
  dispatch: PropTypes.func.isRequired,
  slangRegion: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  slangRegion: makeSelectSlangRegion(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'slangRegion', reducer });
const withSaga = injectSaga({ key: 'slangRegion', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SlangRegion);
