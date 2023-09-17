import classNames from "classnames/bind";

import styles from "./DefaultLayout.module.scss";
import Header from "~/layouts/components/Header";
import SideBar from "../components/SideBar";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  
  useEffect(() => {
    const token = window.localStorage.token;
    if (!token) {
      window.location = "/";
      return;
    }
  }, []);

  return (
    <div className={cx("wrapper")}>
      <SideBar />
      <div className={cx("container")}>
        <Header />
        <div className={cx("content")}>{children}</div>
        <div className={cx("footer")}>2023 © Quản lý ký túc xá</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
