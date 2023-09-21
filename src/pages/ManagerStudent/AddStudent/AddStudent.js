import classNames from "classnames/bind";
import { Form } from "bootstrap-4-react";
import { useState } from "react";

import styles from "./AddStudent.module.scss";
import * as studentService from "~/services/studentService";
import { SentIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function AddStudent() {
  const [data, setData] = useState("");

  const submit = (e) => {
    e.preventDefault();
    studentService
      .postStudent(data)
      .then((student) => console.log(student))
      .catch((error) => console.log(error));
  };

  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  return (
    <div className={cx("wrapper")}>
      <span className={cx("title")}>Thêm sinh viên</span>
      <div className={cx("content")}>
        <div className={cx("content-left")}>
          <p>Lưu ý: </p>
          <p>
            - Mã sinh viên đồng thời là tên đăng nhập cho người dùng là sinh
            viên.{" "}
          </p>
          <p>
            - Nếu mã sinh viên là CN20111 thì mật khẩu mặc định có dạng : "Sv" +
            mã sinh viên.
          </p>
          <p>VD: SvCN20111</p>
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
                value={data.type || "0"}
              />
              <label htmlFor="male">Nam</label>
              <input
                className={cx("radio-input")}
                type="radio"
                id="female"
                name="sex"
                onChange={(e) => handle(e)}
                value={data.type || "1"}
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
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
