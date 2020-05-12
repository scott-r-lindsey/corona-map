import React from 'react';

const VeilContext = React.createContext({
  veil: false,
  setVeil: (veil: boolean) => { }
});

export default VeilContext;
