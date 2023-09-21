import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Button } from "bootstrap-4-react/lib/components";

import styles from "./Login.module.scss";
import * as userService from "~/services/userService";

const cx = classNames.bind(styles);

function Login() {
  const [data, setData] = useState("");

  function handleText(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  function submit(e) {
    userService
      .postUser(data)
      .then((data) => {
        const user = data;
        if (data?.token) {
          window.localStorage.setItem("token", user.token);
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const inputList = document.querySelectorAll("input");

    inputList.forEach((input) => {
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          submit();
        }
      });
    });
  });

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
            value={data.username || ""}
            onChange={(e) => handleText(e)}
            required
          />
        </div>
        <p className={cx("title")}>Mật khẩu</p>
        <div className={cx("form-group")}>
          <input
            type="password"
            className={cx("input-login")}
            placeholder="Password"
            name="password"
            value={data.password || ""}
            onChange={(e) => handleText(e)}
            required
          />
        </div>
        <Button primary className={cx("btn-login")} onClick={submit}>
          Đăng nhập
        </Button>
      </div>
    </div>
  );
}

export default Login;
