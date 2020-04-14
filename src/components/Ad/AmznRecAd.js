import React, {useRef, useEffect} from 'react';

const AmazonRecAd = (props) => {

  // this is a bit of a hacky workaround -- dangerouslySetInnerHTML doesn't run scripts
  // and including an html parsing library seemed extreme

  const {adHeight, ad} = props;

  const id = ad.match(/.*id="([^"]+)"/)[1];
  const src = ad.match(/.*src="([^"]+)"/)[1];
  const divRef = useRef(null);

  useEffect(() => {
    const scriptTag = document.createElement("script");
    scriptTag.src = src;
    divRef.current.appendChild(scriptTag);
  }, [src]);

  return (
    <div className={"bottom-ad"} style={{ height:adHeight+'px', width: '100%' }}>
      <div id={id} ref={divRef} />
    </div>
  );
}

export default AmazonRecAd;
