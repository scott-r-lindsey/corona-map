import React, { useEffect } from "react";
import {Route} from "react-router-dom";
import ReactGA from "react-ga";

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
