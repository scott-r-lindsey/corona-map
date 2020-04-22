import React, { useContext } from "react";
import VeilContext from '../context/Veil';

const Veil = () => {

  const {veil, setVeil} = useContext(VeilContext);

  const handleClick = () => { setVeil(false) }

  const display = veil ? 'block' : 'none';

  return (
    <div
      onClick={handleClick}
      className={"veil"}
      style={{ display: display }}
    >
    </div>
  );
}

export default Veil;
