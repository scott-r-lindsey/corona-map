import React from 'react';

const MobileAd = (props) => {

  const {adWidth, adHeight, ad} = props;

  return (
    <div className={"mobile-ad"} style={{color: 'white', height:adHeight+'px', width: adWidth+'px'}} dangerouslySetInnerHTML={{__html: ad }} />
  );
}

export default MobileAd;
