import React from 'react';
import { useParams } from 'react-router-dom';
import { scaleLog } from 'd3-scale';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import Map from './Map';
import LeftPanel from './LeftPanel';
import MapSlider from './Map/Slider';
import AmznSearchAd from './Ad/AmznSearchAd';
import BottomAdMd from './BottomAdMd';
import MapWidgets from './Map/Widgets';
import { minColor, maxColor } from '../lib/colors';
import { getMaxValueForAxis, getTrimmedData } from '../lib/getMapValue';

import MobileMain from './Main/Mobile/index';

const Main = (props) => {
  const params = useParams();

  const { when, axis, quant } = params;
  const { data, width } = props;

  let min;
  const max = getMaxValueForAxis(data, `${axis}-${quant}`);

  if (quant === 'total') {
    min = 1;
  } else if (quant === 'percap') {
    min = 0.00001;
  }

  const colorScale = scaleLog()
    .domain([min, max])
    .range([minColor, maxColor]);

  const trimmedData = getTrimmedData(data, when);
  const mobile = /xs/.test(width);
  const small = /sm/.test(width);

  let mainWidth = 728;
  const adHeight = 136;

  if (width === 'sm') {
    mainWidth = 512;
  }

  return (
    <>
      { mobile
        ? (
          <MobileMain
            data={data}
            axis={axis}
            when={when}
            colorScale={colorScale}
          />
        )

        : (
          <>
            { small
              ? (
                <>
                  <div
                    className="d-left-column"
                    style={{
                      width: `calc(100% - ${mainWidth}px)`,
                      bottom: '17px',
                    }}
                  >
                    <LeftPanel
                      data={trimmedData}
                      adHeight={adHeight}
                    />
                  </div>
                  <div
                    className="d-main-panel"
                    style={{ width: `${mainWidth}px` }}
                  >
                    <MapWidgets
                      max={max}
                      colorScale={colorScale}
                      data={trimmedData}
                    />
                    <Map
                      when={when}
                      axis={`${axis}-${quant}`}
                      data={data}
                      colorScale={colorScale}
                    />
                    <MapSlider data={data} />
                  </div>
                  <BottomAdMd adHeight={adHeight}>
                    <AmznSearchAd
                      adHeight={adHeight}
                      amznAdVals={data.searchVals}
                    />
                  </BottomAdMd>
                </>
              )

              : (
                <>
                  <div
                    className="d-left-column"
                    style={{ width: `calc(100% - ${mainWidth}px)` }}
                  >
                    <LeftPanel
                      data={trimmedData}
                      adHeight={0}
                    />
                  </div>
                  <div
                    className="d-main-panel"
                    style={{ width: `${mainWidth}px`, bottom: `${adHeight}px` }}
                  >
                    <MapWidgets
                      max={max}
                      colorScale={colorScale}
                      data={trimmedData}
                    />
                    <Map
                      when={when}
                      axis={`${axis}-${quant}`}
                      data={data}
                      colorScale={colorScale}
                    />
                    <MapSlider data={data} />
                  </div>
                  <div
                    className="d-main-footer"
                    style={{ width: `${mainWidth}px`, height: adHeight }}
                  >
                    <AmznSearchAd
                      adHeight={adHeight}
                      amznAdVals={data.searchVals}
                    />
                  </div>
                </>
              )}
          </>
        )}
    </>

  );
};

export default withWidth()(Main);

Main.propTypes = exact({
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
});
