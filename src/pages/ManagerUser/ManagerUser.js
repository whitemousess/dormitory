import classNames from "classnames/bind";
import { Button } from "bootstrap-4-react";

import styles from "./ManagerUser.module.scss";

const cx = classNames.bind(styles);

function ManagerUser() {
  return (
    <div className={cx("wrapper")}>
      <span className={cx("title")}>Danh sách sinh viên</span>

      <div className={cx("action")}>
        <span className={cx("show")}>Hiển thị</span>
        <select className={cx("show-select")}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <Button className={cx("button")} primary>+</Button>
      </div>

      <table className={cx("table")}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên đăng nhập</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>admin</td>
            <td>Lương Văn Hòa</td>
            <td>@123@gmail.com</td>
            <td>0357143496</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ManagerUser;