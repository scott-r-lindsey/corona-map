import React, { useState } from "react";
import { ResponsiveLine } from '@nivo/line'
import ChartFloat from './ChartFloat.js';
import ChartLegend from './ChartLegend.js';
import moment from 'moment-es6';
import { logmidpoints } from '../../lib/util.js';
import {confirmedColor, deathColor, logColor, logLabelColor} from '../../lib/colors.js';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';

const LogChart = (props) => {
  const { data, stateData } = props;
  const chartDateFormat = 'MM/DD/YYYY';
  const [hoverPoint, setHoverPoint] = useState(null);
  const [showLog] = useState(true);

  const calcLog = (x, y, factor) => {
    let max = 1;
    let i = 0;

    // if factor is 2, a progression like:
    //1, x, 2, x, 4, x, 8 ...

    while ((i + factor < x) && (max*2 < y)){
      i+= factor;
      max = max * 2;
    }

    return logmidpoints(1, max, i);
  }
  const generateLogLine = (datesDisplayed, y, factor, name, notShown) => {
    const steps = calcLog(datesDisplayed.length, y, factor);

    const data = steps.map((step, index) => {
      return {
        time: datesDisplayed[index],
        pos: index + notShown,
        x: moment(datesDisplayed[index]).format(chartDateFormat),
        y: step,
      }
    });

    return {
      id: name,
      data
    };
  }

  let chartMax = 0;
  let minDate = 100000000000000;
  let maxDate = 0;

  const preppedStateData = [
    {
      id: 'Confirmed',
      color: confirmedColor,
      data: stateData.series.confirmed.map((count, index) => {
        chartMax = Math.max(chartMax, count);
        if (count > 0){
          minDate = Math.min(minDate, data.dates[index]);
          maxDate = Math.max(maxDate, data.dates[index]);
        }
        return {
          pos: index,
          time: data.dates[index],
          x: moment(data.dates[index]).format(chartDateFormat),
          y: count,
        };
      }).filter(point => point.y > 0),
    },
    {
      id: 'Deaths',
      color: deathColor,
      data: stateData.series.deaths.map((count, index) => {
        chartMax = Math.max(chartMax, count);
        if (count > 0){
          minDate = Math.min(minDate, data.dates[index]);
          maxDate = Math.max(maxDate, data.dates[index]);
        }
        return {
          pos: index,
          time: data.dates[index],
          x: moment(data.dates[index]).format(chartDateFormat),
          y: count,
        };
      }).filter(point => point.y > 0),
    },
  ];

  const datesDisplayed = data.dates.filter(
    date => (date <= maxDate && date >= minDate));

  const notShown = data.dates.length - datesDisplayed.length;

  preppedStateData.unshift(
    generateLogLine(datesDisplayed, chartMax, 3, 'three', notShown)
  );
  preppedStateData.unshift(
    generateLogLine(datesDisplayed, chartMax, 2, 'two', notShown)
  );
  preppedStateData.unshift(
    generateLogLine(datesDisplayed, chartMax, 1, 'one', notShown)
  );

  minDate = moment(minDate).format(chartDateFormat);
  maxDate = moment(maxDate).format(chartDateFormat);

  const styleById = {
      one: {
          strokeWidth: 6,
      },
      two: {
          strokeWidth: 6,
      },
      three: {
          strokeWidth: 6,
      },
      default: {
          strokeWidth: 4,
      },
  }

  const CustomLine = ({ series, lineGenerator, xScale, yScale }) => {
      const s = showLog ? series : series.slice(3,5);

      return s.map(({ id, data, color }) => (
          <path
              key={id}
              d={lineGenerator(
                  data.map(d => ({
                      x: xScale(d.data.x),
                      y: yScale(d.data.y),
                  }))
              )}
              fill="none"
              stroke={color}
              style={styleById[id] || styleById.default}
          />
      ))
  }

  const logIdent = ({series, lineGenerator, xScale, yScale }) => {

    if (!showLog) {return null};

    const onePos = series[0].data[series[0].data.length -1].position;
    const twoPos = series[1].data[series[1].data.length -1].position;
    const threePos = series[2].data[series[2].data.length -1].position;

    return (
      <>
        <text x={onePos.x -10} y={onePos.y+5} fill={logLabelColor}>1x</text>
        <text x={twoPos.x -10} y={twoPos.y+5} fill={logLabelColor}>2x</text>
        <text x={threePos.x -10} y={threePos.y+5} fill={logLabelColor}>3x</text>
      </>
    );
  }

  return(
    <>
        <div className={"log-chart"}
          onMouseLeave={() => {setHoverPoint(null)}}
        >

          <ResponsiveLine
            data={preppedStateData}
            enableGridX={true}
            enableGridY={false}
            enableArea={false}
            enableCrossHair={false}
            areaOpacity={1}
            crosshairType={'x'}
            tooltip={({point}) => (null)}
            animate={false}

            foo={showLog}
            onMouseEnter={(point) => {setHoverPoint(point)}}
            onMouseMove={(point) => {setHoverPoint(point)}}

            layers={['grid', 'markers', 'axes', 'areas', 'crosshair', CustomLine, logIdent, 'points', 'slices', 'mesh', 'legends']}
            colors={[ logColor, logColor, logColor, confirmedColor, deathColor ]}

            margin={{ top: 20, right: 40, bottom: 5, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'log', min: 1, max: chartMax}}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickCount: 0,
              tickSize: 5,
              tickPadding: 10,
              legendOffset: 36,
              legendPosition: 'middle',
              tickValues: [minDate, maxDate],
           }}
            axisLeft={{
              tickValues: [1,10,100,1000,10000,100000,1000000],
              orient: 'left',
              tickSize: 9,
              tickPadding: 4,
            }}
            theme={{
              textColor: '#eee',
              tickColor: '#eee',
            }}
            pointSize={0}
            useMesh={true}
          />
          <ChartFloat
            data={stateData}
            point={hoverPoint}
          />
        </div>
        <ChartLegend
          min={minDate}
          max={maxDate}
        />
    </>
  )
}

export default LogChart;

LogChart.propTypes = exact({
  data: PropTypes.object.isRequired,
  stateData: PropTypes.object.isRequired,
});
