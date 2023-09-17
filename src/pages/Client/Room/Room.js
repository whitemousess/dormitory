import classNames from "classnames/bind";

import styles from "./Room.module.scss";

const cx = classNames.bind(styles);

function Room() {
  return <div className={cx("wrapper")}>
      <div className={cx("title")}>Room</div>
  </div>;
}

export default Room;
