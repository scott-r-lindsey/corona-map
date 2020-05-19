import React, { useContext } from 'react';
import VeilContext from '../context/Veil';

const Veil = () => {
  const { veil, setVeil } = useContext(VeilContext);

  const handleClick = () => { setVeil(false); };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      setVeil(false);
    }
  };

  const display = veil ? 'block' : 'none';

  return (
    <div
      role="presentation"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="veil"
      style={{ display }}
    />
  );
};

export default Veil;
