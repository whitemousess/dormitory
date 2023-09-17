import classNames from "classnames/bind";

import styles from "./ClientStudent.module.scss";

const cx = classNames.bind(styles);

function ClientStudent() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>Client Student</div>
    </div>
  );
}

export default ClientStudent;
