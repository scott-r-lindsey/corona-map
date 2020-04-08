import React from 'react';

const MobileAd = (props) => {

  const {adWidth, adHeight} = props;

  return (
    <div className={"mobile-ad"} style={{color: 'white', height:adHeight+'px', width: adWidth+'px'}}>
      some ad
    </div>
  );
}

export default MobileAd;
