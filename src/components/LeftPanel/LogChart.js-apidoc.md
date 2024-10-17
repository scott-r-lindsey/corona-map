# LogChart Component Documentation

## Overview

The `LogChart` component is a React component that renders a logarithmic chart using the `@nivo/line` library. This chart visualizes COVID-19 confirmed cases and deaths over time, with additional logarithmic guideline lines for better visualization of growth trends.

## Dependencies

The component uses several libraries and modules:
- `react`: For creating the React component.
- `@nivo/line`: For rendering the line chart.
- `moment-es6`: For date formatting.
- `prop-types` and `prop-types-exact`: For type checking of props.
- `ChartFloat` and `ChartLegend`: Custom components for additional chart functionality.
- Utility functions and constants from `../../lib/util` and `../../lib/colors`.

## PropTypes

The `LogChart` component expects two props:
- `data`: An object containing the dates to be displayed on the chart.
- `stateData`: An object containing the series data for confirmed cases and deaths.

```javascript
LogChart.propTypes = exact({
  data: PropTypes.object.isRequired,
  stateData: PropTypes.object.isRequired,
});
```

## State

The component maintains two pieces of state using the `useState` hook:
- `hoverPoint`: The point currently being hovered over on the chart.
- `showLog`: A boolean that determines whether to show the logarithmic guideline lines (always set to `true` in this implementation).

```javascript
const [hoverPoint, setHoverPoint] = useState(null);
const [showLog] = useState(true);
```

## Key Functions

### calcLog

Calculates the steps for the logarithmic guideline lines based on the provided factor.

```javascript
const calcLog = (x, y, factor) => {
  let max = 1;
  let i = 0;

  while ((i + factor < x) && (max*2 < y)){
    i+= factor;
    max = max * 2;
  }

  return logmidpoints(1, max, i);
}
```

### generateLogLine

Generates data for a logarithmic guideline line based on the provided dates, maximum y-value, factor, and line name.

```javascript
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
```

## Data Preparation

The component prepares the data for the chart by iterating over the `stateData` series and calculating the maximum values and date ranges.

```javascript
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
```

The component then filters the dates to be displayed based on the calculated date range and adds the logarithmic guideline lines to the `preppedStateData`.

```javascript
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
```

## Custom Line and Log Identifiers

The component defines two custom elements for the chart:
- `CustomLine`: Customizes the appearance of each line based on its ID.
- `logIdent`: Adds text labels (`1x`, `2x`, `3x`) to the logarithmic guideline lines.

```javascript
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
```

## Rendering

The component renders the `ResponsiveLine` chart from `@nivo/line`. It also incorporates the `ChartFloat` and `ChartLegend` custom components for additional functionality.

```javascript
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
```

## Export

Finally, the component is exported for use in other parts of the application.

```javascript
export default LogChart;
```