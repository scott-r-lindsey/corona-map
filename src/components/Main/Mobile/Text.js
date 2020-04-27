import React from "react";
import { Link } from "react-router-dom";
import CopyFooter from '../../CopyFooter.js';

const Text = () => {

  return (
    <>
      <div className="text-block">

        <p>
          Data is sourced from <a href="https://systems.jhu.edu/research/public-health/ncov/">John Hopkins CSSE</a> and is updated each day.
        </p>

        <p>
          This page is fully bookmarkable -- you can select a particular state and/or axis and share that data directly, or return to the <Link to="/COVID-US/now/deaths/united%20states">United States</Link> at any time.
        </p>

        <p>
          Take appropriate precautions including wearing a mask while outside, social distancing, frequent hand washing and more: There is good and more specific advice available <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">from the WHO</a> and <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html">from the CDC</a>.
        </p>

        <p>
          COVID-VIR.US is created and operated by Scott Lindsey (<a href="/blog/2020/04/12/about/">About</a>).
        </p>
      </div>
      <CopyFooter />
    </>
  );
}

export default Text;

