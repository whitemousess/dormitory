import classNames from "classnames/bind";
import { Form } from "bootstrap-4-react";
import { useState } from "react";

import styles from "./AddStudent.module.scss";
import * as studentService from "~/services/studentService";
import { SentIcon } from "~/components/Icons";
import routes from "~/config/routes";

const cx = classNames.bind(styles);

function AddStudent() {
  const [data, setData] = useState("");

  const submit = (e) => {
    e.preventDefault();
    studentService
      .postStudent(data)
      .then((student) => {window.location = routes.ManagerStudent})
      .catch((error) => console.log(error));
  };

  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  return (
    <div className={cx("wrapper")}>
      <span className={cx("title")}>Thêm sinh viên</span>
      <div className={cx("content")}>
        <div className={cx("content-left")}>
          <p>Lưu ý: </p>
          <p>- Mã sinh viên sẽ được tự động thêm</p>
          <p>
            - Mã sinh viên đồng thời là tên đăng nhập cho người dùng là sinh
            viên.
          </p>
          <p>
            - Nếu mã sinh viên là 20000 thì mật khẩu mặc định có dạng : "Sv" +
            mã sinh viên.
          </p>
          <p>VD: Sv20000</p>
          <p>- Sinh viên có thể đổi mật khẩu sau khi được cấp tài khoản.</p>
        </div>

        <form onSubmit={(e) => submit(e)} className={cx("content-right")}>
          <div className={cx("form-input")}>
            <label>Họ và tên</label>
            <input
              className={cx("text-input")}
              name="fullName"
              value={data.fullName || ""}
              onChange={(e) => handle(e)}
              placeholder="Họ và tên ..."
              required
            />
          </div>
          <div className={cx("form-input")}>
            <label>Giới tính</label>
            <div>
              <input
                className={cx("radio-input")}
                type="radio"
                id="male"
                name="sex"
                onChange={(e) => handle(e)}
                value={data.sex || "0"}
                required
              />
              <label htmlFor="male">Nam</label>
              <input
                className={cx("radio-input")}
                type="radio"
                id="female"
                name="sex"
                onChange={(e) => handle(e)}
                value={data.sex || "1"}
                required
              />
              <label htmlFor="female">Nữ</label>
            </div>
          </div>
          <div className={cx("form-input")}>
            <label>Ngày sinh</label>
            <input
              className={cx("text-input")}
              type="date"
              name="dob"
              value={data.dob || ""}
              onChange={(e) => handle(e)}
              required
            />
          </div>
          <div className={cx("form-input")}>
            <label>Địa chỉ</label>
            <textarea
              placeholder="Nhập địa chỉ ..."
              className={cx("text-input")}
              name="address"
              value={data.address || ""}
              onChange={(e) => handle(e)}
              required
            />
          </div>
          <div className={cx("form-input")}>
            <label>Số điện thoại</label>
            <input
              className={cx("text-input")}
              name="phone"
              value={data.phone || ""}
              onChange={(e) => handle(e)}
              placeholder="Nhập số điện thoại ..."
              required
            />
          </div>
          <div className={cx("svg-wrapper-1")}>
            <button className={cx("btn-add")}>
              <div className={cx("svg-wrapper")}>
                <SentIcon />
              </div>
              <span>Thêm sinh viên</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
