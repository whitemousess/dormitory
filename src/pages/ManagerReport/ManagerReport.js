import classNames from "classnames/bind";
import { Button } from "bootstrap-4-react";

import styles from "./ManagerReport.module.scss";

const cx = classNames.bind(styles);

function ManagerReport() {
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
            <th>Mã thông báo</th>
            <th>Tên sinh viên</th>
            <th>Tiêu đề</th>
            <th>Nội dung</th>
            <th>Thời gian</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mã thông báo</td>
            <td>Tên sinh viên</td>
            <td>Tiêu đề</td>
            <td>Nội dung</td>
            <td>Thời gian</td>
            <td>Trạng thái</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ManagerReport;
