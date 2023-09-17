import classNames from "classnames/bind";

import styles from "./Contract.module.scss";

const cx = classNames.bind(styles);

function Contract() {
  return <div className={cx("wrapper")}>
      <div className={cx("title")}>Contract</div>
  </div>;
}

export default Contract;
