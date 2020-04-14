import React from 'react';
import Map from './Map.js';
import { useParams } from "react-router-dom";
import LeftPanel from './LeftPanel/';
import MapSlider from './MapSlider.js';
import AmazonAd from './AmazonAd.js';
import BottomAdMd from './BottomAdMd.js';
import AxisPicker from './AxisPicker.js';
import { scaleLog } from "d3-scale";
import Scale from './Scale.js';
import { zeroColor, minColor, maxColor} from '../lib/colors.js';
import { getMaxValueForAxis, getTrimmedData } from '../lib/getMapValue.js';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from "prop-types";

import MobileMain from './Main/Mobile/index.js';

const Main = (props) => {

  const params = useParams();
  const { when, axis, location } = params;
  const { data, width } = props;

  const max = getMaxValueForAxis(data, axis);

  const colorScale = scaleLog()
    .domain([1, max])
    .range([ minColor, maxColor ]);

  const trimmedData = getTrimmedData(data, when);
  const mobile = /xs/.test(width);
  const small = /sm/.test(width);

  let mainWidth = '728';
  let adHeight = '136';

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
          { small ?
            <>
              <div className={"d-left-column"} style={{
                  width: `calc(100% - ${mainWidth}px)`,
                  bottom: adHeight,
                }}>
                <LeftPanel location={location} data={trimmedData} adHeight={adHeight} />
              </div>
              <div className={"d-main-panel"} style={{ width: `${mainWidth}px` }} >
                <Scale {...{max, zeroColor, minColor, maxColor, colorScale}} />
                <AxisPicker />
                <Map when={when} axis={axis} data={data} colorScale={colorScale} />
                <MapSlider data={data} />
              </div>
              <BottomAdMd adWidth={mainWidth} adHeight={adHeight} ad={data.adCode} />
            </> :
            <>
              <div className={"d-left-column"} style={ {width: `calc(100% - ${mainWidth}px)` }} >
                <LeftPanel location={location} data={trimmedData} />
              </div>
              <div className={"d-main-panel"} style={{ width: `${mainWidth}px`, bottom: adHeight + 'px' }} >
                <Scale {...{max, zeroColor, minColor, maxColor, colorScale}} />
                <AxisPicker />
                <Map when={when} axis={axis} data={data} colorScale={colorScale} />
                <MapSlider data={data} />
              </div>
              <div className={'d-main-footer'} style={{ width: mainWidth + 'px', height: adHeight}}>
                <AmazonAd adHeight={adHeight} ad={data.adCode} />
              </div>
            </>
          }
        </>
      }
    </>

  );
}

Main.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withWidth()(Main);



