import React from "react";
import { useParams } from "react-router-dom";



const LeftPanel = (props) => {

  const { location } = useParams();
  const { data } = props;
  console.log(data);

  return(


    <div>
      { location === 'us' ?
        <div>this is us</div> :
        <div>not us</div>
      }
    </div>


  )
}

export default LeftPanel;
