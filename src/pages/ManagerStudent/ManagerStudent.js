import classNames from "classnames/bind";
import { Modal, Form, Button } from "bootstrap-4-react";

import styles from "./ManagerStudent.module.scss";
import AddStudent from "./AddStudent/AddStudent";

const cx = classNames.bind(styles);

function ManagerStudent() {
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
        <Button
          className={cx("button")}
          data-toggle="modal"
          data-target="#addStudent"
          primary
        >
          +
        </Button>
      </div>

      <table className={cx("table")}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã sinh viên</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>CNB20DCCN422</td>
            <td>mavuvong</td>
            <td>@123@gmail.com</td>
            <td>0357143496</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <AddStudent />
    </div>
  );
}

export default ManagerStudent;
