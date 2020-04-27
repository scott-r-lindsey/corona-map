import React from 'react';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';

const BottomAdMd = (props) => {

  const {adHeight, children} = props;

  return (
    <div className={"bottom-ad-md"}>
      <div
        className={"bottom-ad"}
        style={{color: 'white', height:adHeight+'px', width: '100%' }}
      >
        { children }
      </div>
    </div>
  );
}

export default BottomAdMd;

BottomAdMd.propTypes = exact({
  children: PropTypes.element.isRequired,
  adHeight: PropTypes.number.isRequired,
});
