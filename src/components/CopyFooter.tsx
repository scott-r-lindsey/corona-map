import * as React from "react";

interface IProps { }

const CopyFooter: React.FC<IProps> = () => {

  return (
    <div className={"footer"}>
      <a href="/blog/privacy-policy/">Privacy Policy</a>
      &nbsp;
      &nbsp;
      <a href="/blog/terms-of-service/">Terms of Service</a><br />
      Copyright &copy; Scott Lindsey
    </div>
  );
}

export default CopyFooter;

