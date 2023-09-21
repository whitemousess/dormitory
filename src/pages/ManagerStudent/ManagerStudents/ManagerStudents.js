import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Button } from "bootstrap-4-react";

import { EditIcon, ShowIcon, TrashIcon } from "~/components/Icons";
import * as studentService from "~/services/studentService";
import styles from "./ManagerStudents.module.scss";
import { Link } from "react-router-dom";
import routes from "~/config/routes";

const cx = classNames.bind(styles);

function ManagerStudents() {
  const [dataStudents, setDataStudents] = useState([]);
  useEffect(() => {
    studentService.getStudents().then((students) => {
      setDataStudents((preData) => [...preData, ...students.data]);
    });
  }, []);

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
       <Link to={routes.addStudent}>
          <Button
            className={cx("button")}
            primary
          >
            +
          </Button>
       </Link>
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

          {dataStudents.map((map, index) => (
            <tr key={map._id}>
              <th>{index + 1}</th>
              <td>{map.masv}</td>
              <td>{map.fullName}</td>
              <td>{map.email}</td>
              <td>{map.phone}</td>
              <td>
                <span onClick={() => console.log(map._id)}>
                  <ShowIcon className={cx("icon-action")} />
                </span>
                <span>
                  <EditIcon className={cx("icon-action")} />
                </span>
                <span>
                  <TrashIcon className={cx("icon-action")} />
                </span>
              </td>
            </tr>
          ))}
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default ManagerStudents;
