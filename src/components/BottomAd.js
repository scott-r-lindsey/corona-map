import React from 'react';

const BottomAd = (props) => {

  const {adHeight, ad} = props;

  return (
    <div className={"bottom-ad"} style={{color: 'white', height:adHeight+'px', width: '100%' }} dangerouslySetInnerHTML={{__html: ad }} />
  );
}

export default BottomAd;
