import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import routes from "~/config/routes";
import * as userService from "~/services/userService";
import * as roomService from "~/services/roomService";
import styles from "./AddRoom.module.scss";
import { SentIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function AddRoom() {
  const [data, setData] = useState({});
  const [userManager, setUserManager] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    roomService.createRoom(data).then((room) => {
      window.location = routes.ManagerRoom
    });
  };

  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }
console.log(data);
  useEffect(() => {
    userService.getAllUsers().then((users) => {
      setUserManager((preV) => [...preV, ...users]);
    });
  }, []);

  return (
    <div className={cx("wrapper")}>
      <span className={cx("title")}>Thêm phòng ở </span>
      <div className={cx("content")}>
        <div className={cx("content-left")}></div>

        <form onSubmit={(e) => submit(e)} className={cx("content-right")}>
          <div className={cx("form-input")}>
            <label>Tên phòng</label>
            <input
              className={cx("text-input")}
              name="room_name"
              value={data.room_name || ""}
              onChange={(e) => handle(e)}
              placeholder="Tên phòng ..."
              required
            />
          </div>
          <div className={cx("form-input")}>
            <label>Khu</label>
            <select
              onChange={(e) => handle(e)}
              name="area"
              className={cx("text-input")}
              required
            >
              <option value="">Khu vực nam nữ</option>
              <option value={"0"}>Nam</option>
              <option value={"1"}>Nữ</option>
            </select>
          </div>
          <div className={cx("form-input")}>
            <label>Người quản lý</label>
            <select
              onChange={(e) => handle(e)}
              value={data.user_id}
              name="user_id"
              className={cx("text-input")}
              required
            >
              <option value="">Người quản lý phòng</option>
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
              value={data.price || ""}
              onChange={(e) => handle(e)}
              placeholder="Giá phòng ..."
              required
            />
          </div>
          <div className={cx("form-input")}>
            <label>Số người 1 phòng</label>
            <input
              type="number"
              className={cx("text-input")}
              name="max_number"
              value={data.max_number || "0"}
              onChange={(e) => handle(e)}
              required
            />
          </div>
          <div className={cx("form-input")}>
            <label>Trạng thái</label>
            <select
              onChange={(e) => handle(e)}
              value={data.status}
              name="status"
              className={cx("text-input")}
              required
            >
              <option value={"0"}>Hoạt động</option>
              <option value={"1"}>Bảo trì</option>
            </select>
          </div>

          <div className={cx("svg-wrapper-1")}>
            <button className={cx("btn-add")}>
              <div className={cx("svg-wrapper")}>
                <SentIcon />
              </div>
              <span>Thêm</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRoom;
