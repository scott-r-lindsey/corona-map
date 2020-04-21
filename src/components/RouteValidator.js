import React from 'react';
import Main from './index.js';
import { home } from '../lib/config.js';
import { useParams, Redirect } from "react-router-dom";

const RouteValidator = (props) => {

  const params = useParams();
  const { data } = props;
  const { mode, location, when, axis, quant } = params;

  const whenValidator = (w) => {
    return (w === 'now' || w.match(/^-[\d]+$/));
  }

  const locationNames =
    mode === 'COVID-COUNTY' ?
      Object.entries(data.county.location).map((s) => (s[1].name.toLowerCase())) :
      Object.entries(data.state.location).map((s) => (s[1].name.toLowerCase()));

  let valid =
    ['COVID-COUNTY', 'COVID-US'].includes(mode) &&
    ['deaths', 'confirmed'].includes(axis) &&
    ['total', 'percap', 'change'].includes(quant) &&
    locationNames.includes(location) &&
    whenValidator(when);

  valid = true;

  //console.log(data.county);

  const modeData = mode === 'COVID-COUNTY' ?
    data.county :
    data.state;

  return (
    <>
      { valid ?
        <Main data={modeData}/> :
        <Redirect to={home}/>
      }
    </>
  );

}

export default RouteValidator;
