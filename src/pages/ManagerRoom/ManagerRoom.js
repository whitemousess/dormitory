import classNames from "classnames/bind";
import { Button } from "bootstrap-4-react";

import styles from "./ManagerRoom.module.scss";

const cx = classNames.bind(styles);

function ManagerRoom() {
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
            <th>Tên phòng</th>
            <th>Người quản lý</th>
            <th>Giá phòng(VND)</th>
            <th>Khu</th>
            <th>Số lượng</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>	
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>102-B1</td>
            <td>Lương Văn Hòa</td>
            <td>123</td>
            <td>Nam</td>
            <td>2/12<span className={cx("status")}>Thiếu</span></td>
            <td><span className={cx("status")}>Hoạt động</span></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ManagerRoom;
