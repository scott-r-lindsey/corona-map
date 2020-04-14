import React from 'react';
import Main from './index.js';
import { home } from '../lib/config.js';
import { useParams, Redirect } from "react-router-dom";

const RouteValidator = (props) => {

  const params = useParams();
  const { data } = props;
  const { location, when, axis } = params;

  const whenValidator = (w) => {
    return (w === 'now' || w.match(/^-[\d]+$/));
  }

  const stateNames =
    Object.entries(data.states).map((s) => (s[1].name.toLowerCase()));

  let valid =
    ['deaths', 'confirmed'].includes(axis) &&
    stateNames.includes(location) &&
    whenValidator(when);

  return (
    <>
      { valid ?
        <Main data={data}/> :
        <Redirect to={home}/>
      }
    </>
  );

}

export default RouteValidator;
