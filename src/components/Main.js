import React from 'react';
import Map from './Map.js';
import { useParams } from "react-router-dom";
import LeftPanel from './LeftPanel.js';
import MapSlider from './MapSlider.js';
import BottomAd from './BottomAd.js';
import AxisPicker from './AxisPicker.js';
import { scaleLog } from "d3-scale";
import Scale from './Scale.js';
import { zeroColor, minColor, maxColor} from '../lib/colors.js';
import { getMaxValueForAxis } from '../lib/getMapValue.js';

function Main(props) {

  const params = useParams();
  const { when, axis, location } = params;
  const { data } = props;

  const max = getMaxValueForAxis(data, axis);

  const colorScale = scaleLog()
    .domain([1, max])
    .range([ minColor, maxColor ]);

  return (
    <>
      <div className={"d-left-column"}>
        <LeftPanel location={location} data={data}/> :
      </div>
      <div className={"d-main-panel"}>
        <Scale {...{max, zeroColor, minColor, maxColor, colorScale}} />
        <AxisPicker />
        <Map when={when} axis={axis} data={data} colorScale={colorScale} />
        <MapSlider data={data} />
      </div>
      <div className={'d-main-footer'}>
        <BottomAd />
      </div>
    </>

  );
}

export default Main;


