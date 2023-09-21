import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Button, Modal } from "bootstrap-4-react/lib/components";

import { EditIcon, ShowIcon, TrashIcon } from "~/components/Icons";
import * as studentService from "~/services/studentService";
import styles from "./ManagerStudents.module.scss";
import { Link } from "react-router-dom";
import routes from "~/config/routes";
import DeleteData from "~/components/DeleteData";

const cx = classNames.bind(styles);

function ManagerStudents() {
  const [dataStudents, setDataStudents] = useState([]);
  const [oneDataStudent, setOneDataStudent] = useState("");
  const [deleteId, setDeleteId] = useState("");

  function deleteData(e) {
    e.preventDefault();
    studentService
      .studentDelete({ deleteID: deleteId })
      .then((account) => (window.location = routes.ManagerStudent))
      .catch((error) => console.log({ error: error }));
  }

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
          <Button className={cx("button")} primary>
            +
          </Button>
        </Link>
      </div>

      <table className={cx("table")}>
        <tbody>
          <tr>
            <th>STT</th>
            <th>Mã sinh viên</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
          {dataStudents.length !== 0 ? (
            dataStudents.map((data, index) => (
              <tr key={data._id}>
                <th>{index + 1}</th>
                <td>{data.masv}</td>
                <td>{data.fullName}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>
                  <span
                    onClick={() => setOneDataStudent(data)}
                    data-toggle="modal"
                    data-target="#show-data"
                  >
                    <ShowIcon className={cx("icon-action")} />
                  </span>
                  <Link to={`/editStudent/${data._id}`}>
                    <span>
                      <EditIcon className={cx("icon-action")}/>
                    </span>
                  </Link>
                  <span
                    data-toggle="modal"
                    data-target="#open-modal"
                    onClick={() => setDeleteId(data._id)}
                  >
                    <TrashIcon className={cx("icon-action")} />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={{ textAlign: "center" }} colSpan="5">
                Chưa có thông tin nào !
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <DeleteData deleteData={deleteData} />

      <div className={cx("show-modal")}>
        <Modal id="show-data" fade>
          <Modal.Dialog centered sm>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Thông tin chi tiết</Modal.Title>
                <Modal.Close>
                  <span className={cx("btn-close")} aria-hidden="true">
                    &times;
                  </span>
                </Modal.Close>
              </Modal.Header>
              <Modal.Body>
                <div className={cx("modal-info")}>
                  <strong>Mã sinh viên:</strong> {oneDataStudent.masv}
                </div>
                <div className={cx("modal-info")}>
                  <strong>Họ và tên: </strong> {oneDataStudent.fullName}
                </div>
                <div className={cx("modal-info")}>
                  <strong>Giới tính:</strong>{" "}
                  {oneDataStudent.sex === 0 ? "nam" : "nữ"}
                </div>
                <div className={cx("modal-info")}>
                  <strong>Ngày sinh:</strong> {oneDataStudent.dob}
                </div>
                <div className={cx("modal-info")}>
                  <strong>Địa chỉ:</strong> {oneDataStudent.address}
                </div>
                <div className={cx("modal-info")}>
                  <strong>Số điện thoại:</strong> {oneDataStudent.phone}
                </div>
                <div className={cx("modal-info")}>
                  <strong>Email:</strong> {oneDataStudent.email}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  secondary
                  className={cx("btn-modal")}
                  data-dismiss="modal"
                >
                  Đóng
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Dialog>
        </Modal>
      </div>
    </div>
  );
}

export default ManagerStudents;
