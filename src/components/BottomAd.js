import React from 'react';

const BottomAd = (props) => {

  const {adWidth, adHeight} = props;

  return (
    <div className={"bottom-ad"} style={{color: 'white', height:adHeight+'px', width: adWidth+'px'}}>
      some ad
    </div>
  );
}

export default BottomAd;
