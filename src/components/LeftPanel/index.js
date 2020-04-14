import React from "react";
import LogChart from './LogChart.js';
import updateUrl from '../../lib/mapUrl.js'
import { useParams, useHistory } from "react-router-dom";
import {getFormattedDate, capitalizeLocation, getStateDataByName} from '../../lib/getMapValue.js';
import Logo from '../Logo.js';
import Info from './Info.js';
import Text from './Text.js';
import CopyFooter from '../CopyFooter.js';

const LeftPanel = (props) => {

  const { location } = useParams();
  const { data, adHeight } = props;
  const history = useHistory();
  const params = useParams();
  const { when } = params;
  const backToUsUrl = updateUrl(params, {location: 'united states'});
  const stateData = getStateDataByName(data, location);

  const backToUs = event => {
    history.push(backToUsUrl);
    event.preventDefault();
  };

  const locationCaps = capitalizeLocation(location);

  let hasData = false;

  // eslint-disable-next-line no-unused-vars
  for (let [axis, values] of Object.entries(stateData.series)){
    if (values[values.length-1] > 0){
      hasData = true;
    }
  }

  const dateSpan = (when) => {
    return (
      <span>
        {
          getFormattedDate(data, when, 'MMMM Do')
        }
      </span>
    );
  }

  const heightDiff = adHeight ? ((adHeight-0) + 270) + 'px' : '270px';

  return(
    <>
      <Logo />
      <div className={"info-panel"}>
        <h1>{locationCaps}</h1>
        <em>
          Displaying {dateSpan('-'+(data.dates.length-1))} until {dateSpan(when)}
        </em>

        { 'united states' === location ? null :
          <a
              href={backToUsUrl}
              className={"back-to-us"}
              alt="Back to US"
              title="Back to US"
              onClick={backToUs}
          >
            <img src="/img/us.svg" alt="Back to US" />
          </a>
        }
        <Info data={data} location={location} />

      </div>
      <div className="scrollable-area" style={{ height: 'calc(100% - ' + heightDiff }}>
        { hasData ?
          <LogChart location={location} data={data} stateData={stateData} /> :
          <>
            <div className={"log-chart"}>
              <div className={"no-data"}>
                <p>
                  No data for period
                </p>
              </div>
            </div>
            <div style={{ height: '20px' }} />
          </>
        }
        <Text />
        <CopyFooter />
      </div>
    </>
  )
}

export default LeftPanel;

