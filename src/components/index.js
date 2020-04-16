import React from 'react';
import Map from './Map.js';
import { useParams } from "react-router-dom";
import LeftPanel from './LeftPanel/';
import MapSlider from './MapSlider.js';
import AmznSearchAd from './Ad/AmznSearchAd.js';
import BottomAdMd from './BottomAdMd.js';
import MapWidgets from './Map/Widgets';
import { scaleLog } from "d3-scale";
import { zeroColor, minColor, maxColor} from '../lib/colors.js';
import { getMaxValueForAxis, getTrimmedData } from '../lib/getMapValue.js';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from "prop-types";

import MobileMain from './Main/Mobile/index.js';

const Main = (props) => {

  const params = useParams();
  const { when, axis, location, quant } = params;
  const { data, width } = props;

  let min;
  const max = getMaxValueForAxis(data, `${axis}-${quant}`);

  if ('total' === quant){
    min = 1;
  }
  else if ('percap' === quant){
    min = .00001;
  }
  else{

  }

  const colorScale = scaleLog()
    .domain([min, max])
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
                <MapWidgets {...{max, zeroColor, minColor, maxColor, colorScale}} />
                <Map when={when} axis={`${axis}-${quant}`} data={data} colorScale={colorScale} />
                <MapSlider data={data} />
              </div>
              <BottomAdMd adWidth={mainWidth} adHeight={adHeight} ad={data.adCode} />
            </> :
            <>
              <div className={"d-left-column"} style={ {width: `calc(100% - ${mainWidth}px)` }} >
                <LeftPanel location={location} data={trimmedData} />
              </div>
              <div className={"d-main-panel"} style={{ width: `${mainWidth}px`, bottom: adHeight + 'px' }} >
                <MapWidgets {...{max, colorScale}} />
                <Map when={when} axis={`${axis}-${quant}`} data={data} colorScale={colorScale} />
                <MapSlider data={data} />
              </div>
              <div className={'d-main-footer'} style={{ width: mainWidth + 'px', height: adHeight}}>
                <AmznSearchAd adHeight={adHeight} amznAdVals={data.searchVals} />
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



