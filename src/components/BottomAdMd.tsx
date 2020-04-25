import * as React from 'react';

interface IProps {
  adHeight: number,
  children: HTMLElement,
}

const BottomAdMd: React.FC<IProps> = ({adHeight, children}) => {

  console.log({adHeight});
  console.log(typeof(adHeight));

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

