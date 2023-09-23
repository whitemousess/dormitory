import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import * as studentService from "~/services/studentService";
import * as userService from "~/services/userService";

const cx = classNames.bind(styles);

function Home() {
  const [dataStudent, setDataStudent] = useState([]);
  const [dataUser, setDataUSer] = useState([]);

  useEffect(() => {
    studentService.getStudents().then((student) => setDataStudent(student));
    userService.getAllUsers().then((user) => setDataUSer(user));
  }, []);

  return (
    <div className={cx("wrapper")}>
      <span className={cx("header")}>Trang chủ</span>

      <div className={cx("Data")}>
        Số liệu sinh viên
        <div className={cx("box")}>
          <span className={cx("title")}> Tổng số sinh viên</span>
          <span className={cx("count")}>{dataStudent.length}</span>
        </div>
      </div>

      <div className={cx("Data")}>
        Số liệu phòng
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
            <span className={cx("count")}>{dataStudent.length + dataUser.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
