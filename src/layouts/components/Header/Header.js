import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";

import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header() {
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
    </div>
  );
}

export default Header;
