
import React from "react";
import {getDataValue, getFormattedDate, getStateDataByName} from '../../lib/getMapValue.js';
import moment from 'moment-es6';
import withWidth from '@material-ui/core/withWidth';

const Info = (props) => {

  const {data, location} = props;
  const stateData = getStateDataByName(data, location);

  const axisDifference = (axis) => {
    return (
      getDataValue(data, 'now', location, axis) -
      getDataValue(data, 'now', location, axis, -1));
  }
  const lastDateInfo = () => {
    return getFormattedDate(data, 'now', 'M/D')
  }
  const findFirstDate = (axis, format) => {
    const date = data.dates[stateData.series[axis].filter(v => v === 0).length +1];

    return moment(date).format(format);
  }

  return (

    <table>
      <thead>
        <tr>
          <th>Cases</th>
          <th>Deaths</th>
        </tr>
      </thead>
      <tbody>
        <tr className={"data"}>
          <td className={"confirmed"}>
            { getDataValue(data, 'now', location, 'confirmed') }
            <span className={"increase"}>
             (+{ axisDifference('confirmed')} <br />
              on {lastDateInfo()} )
            </span>
          </td>
          <td className={"deaths"}>
            { getDataValue(data, 'now', location, 'deaths') }
            <span className={"increase"}>
             (+{ axisDifference('deaths')} <br />
              on {lastDateInfo()} )
            </span>
          </td>
        </tr>
        <tr className={"more-info"}>
          <td className={"confirmed"}>
            <span>First Case:</span> {findFirstDate('confirmed', 'MMMM Do')}
          </td>
          <td className={"deaths"}>
            <span>First Death:</span> {findFirstDate('deaths', 'MMMM Do')}
          </td>
        </tr>
      </tbody>
    </table>


  );

}

export default withWidth()(Info);
