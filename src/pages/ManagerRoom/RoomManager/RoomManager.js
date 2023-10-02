import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Button } from "bootstrap-4-react";
import { Modal } from "bootstrap-4-react/lib/components";

import routes from "~/config/routes";
import DeleteData from "~/components/DeleteData";
import styles from "./RoomManager.module.scss";
import * as roomService from "~/services/roomService";
import { EditIcon, ShowIcon, TrashIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function RoomManager() {
  const [dataRoom, setDataRoom] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [oneDataStudent, setOneDataStudent] = useState("");

  function deleteData(e) {
    e.preventDefault();
    roomService
      .deleteRoom(deleteId)
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    roomService
      .getRoomManager()
      .then((Room) => setDataRoom((preV) => [...preV, ...Room]));
  }, []);

  return (
    <div className={cx("wrapper")}>
      <span className={cx("title")}>Danh sách Phòng</span>

      <div className={cx("action")}>
        <span className={cx("show")}>Hiển thị</span>
        <select className={cx("show-select")}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>

      <table className={cx("table")}>
        <tbody>
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

          {dataRoom.length > 0 ? (
            dataRoom.map((Room, index) => (
              <tr key={Room._id}>
                <td>{index + 1}</td>
                <td>{Room.room_name}</td>
                <td>
                  {Room.user_id ? Room.user_id.fullName : "Chưa có người quản lý"}
                  </td>
                <td>{Room.price}</td>
                <td>{Room.area === "0" ? "Nam" : "Nữ"}</td>
                <td>
                  {"0/" + Room.max_number}
                  <span className={cx("status-error")}>Thiếu</span>
                </td>
                <td>
                  {Room.status === "0" ? (
                    <span className={cx("status")}>Hoạt động</span>
                  ) : (
                    <span className={cx("status-error")}>Bảo trì</span>
                  )}
                </td>
                <td>
                  <span
                    onClick={() => setOneDataStudent(Room)}
                    data-toggle="modal"
                    data-target="#show-data"
                  >
                    <ShowIcon className={cx("icon-action")} />
                  </span>
                  <Link to={`/editRoom/${Room._id}`}>
                    <span>
                      <EditIcon className={cx("icon-action")} />
                    </span>
                  </Link>
                  <span
                    data-toggle="modal"
                    data-target="#open-modal"
                    onClick={() => setDeleteId(Room._id)}
                  >
                    <TrashIcon className={cx("icon-action")} />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} style={{ textAlign: 'center' }}>Chưa có phòng nào !</td>
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
                  <strong>Tên phòng:</strong> {oneDataStudent.room_name}
                </div>
                <div className={cx("modal-info")}>
                  <strong>Người quản lý: </strong>
                  {oneDataStudent ? oneDataStudent.user_id.fullName : null}
                </div>
                <div className={cx("modal-info")}>
                  <strong>Giá phòng:</strong> {oneDataStudent.price}
                </div>
                <div className={cx("modal-info")}>
                  <strong>Khu vực dành cho:</strong> {oneDataStudent.area === 0 ? "Nam" : "Nữ"}
                </div>
                <div className={cx("modal-info")}>
                  <strong>Trạng thái:</strong> {oneDataStudent.status === "0" ? "Hoạt động" : "Bảo trì"}
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

export default RoomManager;
