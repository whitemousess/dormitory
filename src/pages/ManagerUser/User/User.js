import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Button, Modal } from "bootstrap-4-react/lib/components";

import { EditIcon, ShowIcon, TrashIcon } from "~/components/Icons";
import * as userService from "~/services/userService";
import styles from "./User.module.scss";
import routes from "~/config/routes";
import DeleteData from "~/components/DeleteData";

const cx = classNames.bind(styles);

function User() {
  const [dataStudents, setDataStudents] = useState([]);
  const [oneDataStudent, setOneDataStudent] = useState("");
  const [deleteId, setDeleteId] = useState("");

  function deleteData(e) {
    e.preventDefault();
    userService
      .userDelete({ deleteID: deleteId })
      .then((account) => window.location.reload())
      .catch((error) => console.log({ error: error }));
  }

  useEffect(() => {
    userService.getAllUsers().then((students) => {
      setDataStudents((preData) => [...preData, ...students]);
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
        <Link to={routes.AddUser}>
          <Button className={cx("button")} primary>
            +
          </Button>
        </Link>
      </div>

      <table className={cx("table")}>
        <tbody>
          <tr>
            <th>STT</th>
            <th>Tên đăng nhập</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
          {dataStudents.length !== 0 ? (
            dataStudents.map((data, index) => (
              <tr key={data._id}>
                <th>{index + 1}</th>
                <td>{data.username}</td>
                <td>{data.fullName}</td>
                <td><Link to={`mailto:${data.email}`}>{data.email}</Link></td>
                <td><Link to={`tel:${data.phone}`}>{data.phone}</Link></td>
                <td>
                  <span
                    onClick={() => setOneDataStudent(data)}
                    data-toggle="modal"
                    data-target="#show-data"
                  >
                    <ShowIcon className={cx("icon-action")} />
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
                <div className={cx("modal-avatar")}>
                  <img
                    className={cx("avatar")}
                    src={oneDataStudent.avatarUrl}
                    alt={oneDataStudent.fullName}
                  />
                </div>
                <div className={cx("modal-info")}>
                  <strong>Tài khoản: </strong> {oneDataStudent.username}
                </div>                <div className={cx("modal-info")}>
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

export default User;
