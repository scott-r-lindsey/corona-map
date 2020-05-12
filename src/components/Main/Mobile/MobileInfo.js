import React from "react";
import Logo from '../../Logo';
import { primary } from '../../../lib/colors';
import { useParams } from "react-router-dom";
import {getFormattedDate, capitalizeLocation} from '../../../lib/getMapValue';
import Info from '../../LeftPanel/Info';

const MobileInfo = (props) => {

  const { location, when } = useParams();
  const { data } = props;

  const locationCaps = capitalizeLocation(location);

  const dateSpan = (when) => {
    return (
      <span>
        {
          getFormattedDate(data, when, 'MMMM Do')
        }
      </span>
    );
  }

  return (
    <div className={'mobile-info'} style={{backgroundColor: primary}}>
      <Logo />
      <div className={"detail"}>
       <h1>{ locationCaps }</h1>
        <em>
          Displaying {dateSpan('-'+(data.dates.length-1))} until {dateSpan(when)}
        </em>

       <Info data={data} location={location} />

      </div>
    </div>
  );
}

export default MobileInfo;
