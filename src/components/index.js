import React from 'react';
import Map from './Map.js';
import { useParams } from "react-router-dom";
import LeftPanel from './LeftPanel/';
import MapSlider from './MapSlider.js';
import BottomAd from './BottomAd.js';
import AxisPicker from './AxisPicker.js';
import { scaleLog } from "d3-scale";
import Scale from './Scale.js';
import { zeroColor, minColor, maxColor} from '../lib/colors.js';
import { getMaxValueForAxis, getTrimmedData } from '../lib/getMapValue.js';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from "prop-types";

import MobileMain from './Main/Mobile/index.js';


function Main(props) {

  const params = useParams();
  const { when, axis, location } = params;
  const { data, width } = props;

  const max = getMaxValueForAxis(data, axis);

  const colorScale = scaleLog()
    .domain([1, max])
    .range([ minColor, maxColor ]);

  const trimmedData = getTrimmedData(data, when);
  const mobile = /xs/.test(width);

  let mainWidth = '728';
  let adHeight = '90';

  if ('sm' === width){
    mainWidth = '512';
  }

  return (
    <>
      { mobile ?
        <MobileMain
          data={data}
          axis={axis}
          when={when}
          location={location}
          colorScale={colorScale}
        /> :
        <>
          <div className={"d-left-column"} style={ {width: `calc(100% - ${mainWidth}px` }} >
            <LeftPanel location={location} data={trimmedData}/>
          </div>
          <div className={"d-main-panel"} style={{ width: `${mainWidth}px` }} >
            <Scale {...{max, zeroColor, minColor, maxColor, colorScale}} />
            <AxisPicker />
            <Map when={when} axis={axis} data={data} colorScale={colorScale} />
            <MapSlider data={data} />
          </div>
          <div className={'d-main-footer'} style={{ width: mainWidth, height: adHeight}}>
            <BottomAd adWidth={mainWidth} adHeight={adHeight} />
          </div>
        </>
      }
    </>

  );
}

Main.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withWidth()(Main);



