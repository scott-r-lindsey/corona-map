import React from 'react';
import {
  Link
} from "react-router-dom";

export default function Home() {

  return(
    <div className={"dev-landing"}>
      <ul>
        <li><Link to="/gridA" >React Grid Layout (test)</Link></li>
        <li><Link to="/gridB" >Material UI Grid (test)</Link></li>
        <li><Link to="/blog" >Blog</Link></li>
        <li><Link to="/blog/0" >Blog Detail</Link></li>
      </ul>
    </div>
  );
}

