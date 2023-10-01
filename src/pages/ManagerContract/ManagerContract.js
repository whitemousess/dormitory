import classNames from "classnames/bind";
import { Button } from "bootstrap-4-react";

import styles from "./ManagerContract.module.scss";

const cx = classNames.bind(styles);

function ManagerContract() {
  return (
    <div className={cx("wrapper")}>
      <span className={cx("title")}>Danh sách hợp đồng</span>

      <div className={cx("action")}>
        <span className={cx("show")}>Hiển thị</span>
        <select className={cx("show-select")}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>

      <table className={cx("table")}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã hợp đồng</th>
            <th>Mã sinh viên</th>
            <th>Người tạo</th>
            <th>Ngày tạo</th>
            <th>Ngày hết hạn</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>12</td>
            <td>mavuvong</td>
            <td>CNB20DCCN421</td>
            <td>40</td>
            <td>2023-05-03</td>
            <td>2024-05-03</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ManagerContract;
