import classNames from "classnames/bind";
import { useState } from "react";

import styles from "./AddStudent.module.scss";
import * as userService from "~/services/userService";
import { SentIcon } from "~/components/Icons";
import routes from "~/config/routes";

const cx = classNames.bind(styles);

function AddStudent() {
  const [data, setData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("fullName", data.fullName);
    formData.append("address", data.address);
    formData.append("dob", data.dob);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    try {
      await userService.postUser(formData);
      window.location = routes.ManagerStudent;
    } catch (error) {
      console.log(error);
    }
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
                name="gender"
                onChange={(e) => handle(e)}
                value={0}
                required
              />
              <label htmlFor="male">Nam</label>
              <input
                className={cx("radio-input")}
                type="radio"
                id="female"
                name="gender"
                onChange={(e) => handle(e)}
                value={1}
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
          <div className={cx("from-input")}>
            <input type="file" name="avatar" onChange={handleFileChange} />
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
