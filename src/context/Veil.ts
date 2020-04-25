import React from 'react';

export interface VeilContextInterface {
  veil: boolean,
  setVeil: (veil: boolean) => void;
}

const VeilContext = React.createContext<VeilContextInterface | null>(null);

export default VeilContext;
