import React from 'react';

import { Link } from 'react-router-dom';
import { home } from '../lib/config';

const Logo = () => (
  <div className="logo">
    <Link to={home} className="logo">
      <img src="/img/covid-19-100.png" alt="corona-virus" />
      <span className="logo-text">
          COVID-VIR.US
      </span>
    </Link>
  </div>
);

export default Logo;
