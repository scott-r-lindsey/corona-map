import React from "react";
import { Link } from "react-router-dom";

const Text = (props) => {

  return (
    <div className="text-block">

      <p>
        Chart is presented in Lograthimic (10, 100, 1000...) format to best show "the curve" and our efforts to bend that curve downward by limiting the exponential increase in new cases.
      </p>

      <p>
    The 1x, 2x and 3x lines reprensent a hypothetical increase rate of doubling every day, every two days, or every three days respectively.
      </p>

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
  );

}
export default Text;
