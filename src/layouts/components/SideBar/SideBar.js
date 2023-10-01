import classNames from "classnames/bind";

import styles from "./SideBar.module.scss";
import routes from "~/config/routes";
import Menu from "./Menu";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function SideBar() {
  return (
    <div className={cx("wrapper")}>
      <Link to={routes.home}>
        <div className={cx("title")}>University</div>
      </Link>

      <Menu />
    </div>
  );
}

export default SideBar;
