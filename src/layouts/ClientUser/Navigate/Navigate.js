import classNames from "classnames/bind";

import styles from "./Navigate.module.scss";
import { NavLink } from "react-router-dom";
import routes from "~/config/routes";

const cx = classNames.bind(styles);

function Navigate() {
  return (
    <div className={cx("wrapper")}>
      <NavLink
        className={(nav) => cx("link-navigate", { active: nav.isActive })}
        to={routes.ClientStudent}
      >
        Trang chủ
      </NavLink>
        <NavLink
          className={(nav) => cx("link-navigate", { active: nav.isActive })}
          to={routes.Room}
        >
          Phòng
        </NavLink>
        <NavLink
          className={(nav) => cx("link-navigate", { active: nav.isActive })}
          to={routes.Service}
        >
          Dịch vụ
        </NavLink>
        <NavLink
          className={(nav) => cx("link-navigate", { active: nav.isActive })}
          to={routes.Contract}
        >
          Hợp đồng
        </NavLink>
        <NavLink
          className={(nav) => cx("link-navigate", { active: nav.isActive })}
          to={routes.Reports}
        >
          Báo cáo
        </NavLink>
        <NavLink
          className={(nav) => cx("link-navigate", { active: nav.isActive })}
          to={routes.Payment}
        >
          Thanh toán
        </NavLink>
    </div>
  );
}

export default Navigate;
