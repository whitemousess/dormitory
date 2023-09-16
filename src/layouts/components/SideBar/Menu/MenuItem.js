import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon ,activeIcon }) {
  return (
    <div className={cx("container")}>
      <NavLink
        className={(nav) => cx("menu-item", { active: nav.isActive })}
        to={to}
      >
        <span className={cx("active-icon")}>{activeIcon}</span>
        <span className={cx("icon")}>{icon}</span>
        <span className={cx("title")}>{title}</span>
      </NavLink>
    </div>
  );
}

export default MenuItem;
