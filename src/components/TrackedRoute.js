import React, { useEffect } from "react";
import {Route} from "react-router-dom";
import ReactGA from "react-ga";
import PropTypes from "prop-types";
import exact from 'prop-types-exact';

const TrackedRoute = (props) => {

  useEffect(() => {
    const page = props.location.pathname;

    ReactGA.set({page});
    ReactGA.pageview(page);

  }, [props.location.pathname]);

  return (
    <Route {...props}/>
  );
};

export default TrackedRoute;

TrackedRoute.propTypes = exact({
  location: PropTypes.object,
  path: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  computedMatch: PropTypes.object,
});
