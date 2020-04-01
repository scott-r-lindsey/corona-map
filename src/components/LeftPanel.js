import React from "react";
import { useParams } from "react-router-dom";
import LogChart from './LogChart.js';

const LeftPanel = (props) => {

  const { location } = useParams();
  const { data } = props;

  const locationCaps = location.split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

  return(
    <>
      <strong>{locationCaps}</strong>
      <LogChart location={location} data={data} />
    </>
  )
}

export default LeftPanel;

