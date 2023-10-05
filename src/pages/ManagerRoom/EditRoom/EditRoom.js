import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import routes from "~/config/routes";
import * as roomService from "~/services/roomService";
import * as userService from "~/services/userService";
import { SentIcon } from "~/components/Icons";
import styles from "./EditRoom.module.scss";

const cx = classNames.bind(styles);

function EditRoom() {
  const [dataRoom, setDataRoom] = useState({});
  const [userManager, setUserManager] = useState([]);
  const RoomId = window.location.href.split("/").pop();

  const submit = async (e) => {
    e.preventDefault();
    roomService.editRoom({ id: RoomId, data: dataRoom }).then((room) => {
      window.location = routes.ManagerRoom;
    });
  };

  const handle = (e) => {
    const newData = { ...dataRoom };
    newData[e.target.name] = e.target.value;
    setDataRoom(newData);
  };
  
  function handleConvert(e) {
    const newData = { ...dataRoom };
    newData[e.target.name] = parseInt(e.target.value);
    setDataRoom(newData);
  }

  useEffect(() => {
    userService.getAllUsers().then((users) => {
      setUserManager((preV) => [...preV, ...users]);
    });

    roomService.getRoomManagerId(RoomId).then((room) => {
      setDataRoom(room);
    });
  }, []);

  return (
    <div className={cx("wrapper")}>
      <span className={cx("title")}>Sửa sinh viên</span>
      <div className={cx("content")}>
        <div className={cx("content-left")}></div>

        <form onSubmit={(e) => submit(e)} className={cx("content-right")}>
          <div className={cx("form-input")}>
            <label>Tên phòng</label>
            <input
              className={cx("text-input")}
              name="room_name"
              value={dataRoom.room_name || ""}
              onChange={(e) => handle(e)}
              placeholder="Tên phòng ..."
              required
            />
          </div>
          <div className={cx("form-input")}>
            <label>Khu</label>
            <select
              onChange={(e) => handleConvert(e)}
              value={dataRoom.area}
              name="area"
              className={cx("text-input")}
              required
            >
              <option value={0}>Nam</option>
              <option value={1}>Nữ</option>
            </select>
          </div>
          <div className={cx("form-input")}>
            <label>Người quản lý</label>
            <select
              onChange={(e) => handle(e)}
              value={dataRoom.user_id ? dataRoom.user_id._id : ""}
              name="user_id"
              className={cx("text-input")}
              required
            >
              {userManager.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>
          <div className={cx("form-input")}>
            <label>Giá phòng (VND)</label>
            <input
              className={cx("text-input")}
              name="price"
              value={dataRoom.price || ""}
              onChange={(e) => handleConvert(e)}
              placeholder="Giá phòng ..."
              required
            />
          </div>
          <div className={cx("form-input")}>
            <label>Số người 1 phòng</label>
            <input
              type="number"
              min="0"
              className={cx("text-input")}
              name="max_number"
              value={dataRoom.max_number || 0}
              onChange={(e) => handleConvert(e)}
              required
            />
          </div>
          <div className={cx("form-input")}>
            <label>Trạng thái</label>
            <select
              onChange={(e) => handleConvert(e)}
              value={dataRoom.status}
              name="status"
              className={cx("text-input")}
              required
            >
              <option value={0}>Hoạt động</option>
              <option value={1}>Bảo trì</option>
            </select>
          </div>

          <div className={cx("svg-wrapper-1")}>
            <button className={cx("btn-add")}>
              <div className={cx("svg-wrapper")}>
                <SentIcon />
              </div>
              <span>Sửa</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRoom;
