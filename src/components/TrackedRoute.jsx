import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

const TrackedRoute = (props) => {
  const { location } = props;

  useEffect(() => {
    // disable the analytics during tests
    if (!global.test) {
      const page = location.pathname;

      ReactGA.set({ page });
      ReactGA.pageview(page);
    }
  }, [location.pathname]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...props} />
  );
};

export default TrackedRoute;

TrackedRoute.defaultProps = {
  location: {},
  computedMatch: {},
};
TrackedRoute.propTypes = exact({
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  computedMatch: PropTypes.object,
  path: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
});
