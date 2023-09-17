import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { Link } from "react-router-dom";
import { Button } from "bootstrap-4-react/lib/components";

import routes from "~/config/routes";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header() {
  const userToken = false;

  const MENU_ITEM = () => {
    return (
      <div className={cx("menu-item")}>
        <Link className={cx("menu-link")}>Thông tin cá nhân</Link>
        <Link className={cx("menu-link")}>Cài đặt</Link>
        <Link className={cx("menu-link")}>Đăng xuất</Link>
      </div>
    );
  };

  return (
    <div className={cx("wrapper")}>
      {userToken ? (
        <Tippy
          hideOnClick={true}
          interactive
          trigger={"click"}
          render={MENU_ITEM}
          popperOptions={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [-40, 0], // Điều chỉnh giá trị "-20px" để di chuyển sang trái
                },
              },
            ],
          }}
        >
          <div className={cx("user")}>
            <img
              className={cx("avatar")}
              src="https://res.cloudinary.com/dd6sxqlso/image/upload/v1694248361/pets/t5i9xbm3wthrwsbnca9c.jpg"
              alt="error"
            />
            <span className={cx("username")}>Trần Ngọc Thắng</span>
          </div>
        </Tippy>
      ) : (
        <div className={cx("user")}>
          <Link to={routes.Login}>
            <Button className={cx("btn-login")} primary>
              Đăng nhập
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
