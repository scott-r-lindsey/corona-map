
import React from "react";
import {getDataValue, getFormattedDate, getStateDataByName} from '../../lib/getMapValue';
import moment from 'moment-es6';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';

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
            { getDataValue(data, 'now', location, 'confirmed').toLocaleString() }
            <span className={"increase"}>
             (+{ axisDifference('confirmed').toLocaleString()} <br />
              on {lastDateInfo()} )
            </span>
          </td>
          <td className={"deaths"}>
            { getDataValue(data, 'now', location, 'deaths').toLocaleString() }
            <span className={"increase"}>
             (+{ axisDifference('deaths').toLocaleString()} <br />
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

export default Info;

Info.propTypes = exact({
  data: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
});
