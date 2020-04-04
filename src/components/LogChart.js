import React from "react";
import { ResponsiveLine } from '@nivo/line'
import ChartTooltip from './ChartTooltip.js';
import moment from 'moment-es6';
import logmidpoints from '../lib/logmidpoints.js';
import {getStateDataByName} from '../lib/getMapValue.js';
import {confirmedColor, deathColor, logColor, logLabelColor} from '../lib/colors.js';

const LogChart = (props) => {
  const { location, data } = props;
  const chartDateFormat = 'MM/DD/YYYY';

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

  const rawStateData = getStateDataByName(data, location);

  let chartMax = 0;
  let minDate = 100000000000000;
  let maxDate = 0;

  const stateData = [
    {
      id: 'Confirmed',
      color: confirmedColor,
      data: rawStateData.confirmed.map((count, index) => {
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
      data: rawStateData.deaths.map((count, index) => {
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

  stateData.unshift(
    generateLogLine(datesDisplayed, chartMax, 3, 'three', notShown)
  );
  stateData.unshift(
    generateLogLine(datesDisplayed, chartMax, 2, 'two', notShown)
  );
  stateData.unshift(
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
      return series.map(({ id, data, color }) => (
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
      <div>
        <div style={{height:'400px'}}>

          <ResponsiveLine
            data={stateData}
            enableGridX={true}
            enableArea={false}
            areaOpacity={1}

            tooltip={({point}) => (
              <ChartTooltip
                point={point}
                data={rawStateData}
                colors={{confirmed: confirmedColor, deaths: deathColor}}
              />
            )}

            layers={['grid', 'markers', 'axes', 'areas', CustomLine, logIdent, 'points', 'slices', 'mesh', 'legends']}
            colors={[ logColor, logColor, logColor, confirmedColor, deathColor ]}

            margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'log', min: 1, max: chartMax}}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickCount: 2,
              tickSize: 5,
              tickPadding: 10,
              tickRotation: 0,
              legendOffset: 36,
              legendPosition: 'middle',
              tickValues: [minDate, maxDate],
            }}
            axisLeft={{
              tickValues: [0,10,100,1000,10000,100000], // react-dom.development.js:1297 Error: <g> attribute transform: Trailing garbage, "translate(0,NaN)"
              orient: 'left',
              tickSize: 9,
              tickPadding: 4,
              legend: 'count',
              legendOffset: -40,
              legendPosition: 'middle'
            }}
            pointSize={0}
            useMesh={true}
          />

        </div>
      </div>
    </>
  )
}

export default LogChart;
