import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import ReactGA from "react-ga";


interface Props {
  location?: Location;
  path: string;
  children: React.ReactElement<Text>;
  computedMatch?: string;
}

const TrackedRoute: React.FC<Props> = (props) => {

  useEffect(() => {
    if (props.location) {
      const page = props.location.pathname;

      ReactGA.set({page});
      ReactGA.pageview(page);
    }

  }, [props.location]);

  return (
    <Route { ...props }/>
  );
};

export default TrackedRoute;

/*
TrackedRoute.propTypes = exact({
  location: PropTypes.object,
  path: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  computedMatch: PropTypes.object,
});
*/
