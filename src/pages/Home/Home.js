import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import * as studentService from "~/services/studentService";

const cx = classNames.bind(styles);

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    studentService.getStudents().then((student) => setData(student.data));
  }, []);
  return (
    <div className={cx("wrapper")}>
      <span className={cx("header")}>Trang chủ</span>

      <div className={cx("Data")}>
        Số liệu sinh viên
        <div className={cx("box")}>
          <span className={cx("title")}> Tổng số sinh viên</span>
          <span className={cx("count")}>{data.length}</span>
        </div>
      </div>

      <div className={cx("Data")}>
        Số liệu sinh viên
        <div className={cx("df")}>
          <div className={cx("box")}>
            <span className={cx("title")}>Tổng số phòng</span>
            <span className={cx("count")}>3</span>
          </div>

          <div className={cx("box")}>
            <span className={cx("title")}>Tổng số phòng trống</span>
            <span className={cx("count")}>0</span>
          </div>

          <div className={cx("box")}>
            <span className={cx("title")}>Phòng chưa ghép đủ</span>
            <span className={cx("count")}>3</span>
          </div>
        </div>
      </div>

      <div className={cx("Data")}>
        Số liệu người dùng
        <div className={cx("df")}>
          <div className={cx("box")}>
            <span className={cx("title")}>Tổng số người dùng</span>
            <span className={cx("count")}>3</span>
          </div>

          <div className={cx("box")}>
            <span className={cx("title")}>Số tài khoản bị khóa</span>
            <span className={cx("count")}>0</span>
          </div>

          <div className={cx("box")}>
            <span className={cx("title")}>Số tài khoản hoạt động</span>
            <span className={cx("count")}>3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
