import classNames from "classnames/bind";

import styles from "./Login.module.scss";
import { Button } from "bootstrap-4-react/lib/components";

const cx = classNames.bind(styles);

function Login() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <header className={cx("header")}>Đăng nhập</header>
        <p className={cx("title")}>Tài khoản</p>
        <div className={cx("form-group")}>
          <input
            type="text"
            className={cx("input-login")}
            placeholder="Tài khoản"
            name="username"
            required
          />
        </div>
        <p className={cx("title")}>Mật khẩu</p>
        <div className={cx("form-group")}>
          <input
            type="password"
            className={cx("input-login")}
            id="Password"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <Button primary className={cx("btn-login")}>
          Đăng nhập
        </Button>
      </div>
    </div>
  );
}

export default Login;
