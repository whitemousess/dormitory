import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import routes from "~/config/routes";
import { SentIcon } from "~/components/Icons";
import styles from "./EditStudent.module.scss";
import * as userService from "~/services/userService";

const cx = classNames.bind(styles);

function EditStudent() {
  const [dataStudent, setDataStudent] = useState({});
  const [selectedFile, setSelectedFile] = useState({});
  const studentId = window.location.href.split("/").pop();

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullName', dataStudent.fullName);
    formData.append('password', dataStudent.password);
    formData.append('address', dataStudent.address);
    formData.append('dob', dataStudent.dob);
    formData.append('email', dataStudent.email);
    formData.append('phone', dataStudent.phone);
    formData.append('sex', dataStudent.sex);
    formData.append('avatar', selectedFile);

    try {
      await userService.putUser({ data: formData, studentId: studentId });
      window.location = routes.ManagerStudent;
    } catch (error) {
      console.log(error);
    }
  };

  const handle = (e) => {
    const newData = { ...dataStudent };
    newData[e.target.name] = e.target.value;
    setDataStudent(newData);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleGender = (e, genderValue) => {
    const newData = { ...dataStudent };
    newData[e.target.name] = genderValue;
    setDataStudent(newData);
  };

  useEffect(() => {
    userService
      .getUserId(studentId)
      .then((student) => {
        setDataStudent(student.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={cx("wrapper")}>
      <span className={cx("title")}>Sửa sinh viên</span>
      <div className={cx("content")}>
        <div className={cx("content-left")}></div>

        <form className={cx("content-right")} onSubmit={(e) => submit(e)}>
          <div className={cx("form-input")}>
            <label>Mã sinh viên : {dataStudent.masv}</label>
          </div>
          <div className={cx("form-input")}>
            <label>Họ và tên</label>
            <input
              className={cx("text-input")}
              name="fullName"
              placeholder="Họ và tên ..."
              value={dataStudent.fullName || ""}
              onChange={(e) => handle(e)}
              required
            />
          </div>
          <div className={cx("form-input")}>
            <label>Mật khẩu</label>
            <input
              type="password"
              className={cx("text-input")}
              name="password"
              placeholder="Mật khẩu ..."
              value={dataStudent.password || ""}
              onChange={(e) => handle(e)}
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
                value={0}
                onChange={(e) => handleGender(e, 0)}
                checked={dataStudent.sex === 0}
                required
              />
              <label htmlFor="male">Nam</label>
              <input
                className={cx("radio-input")}
                type="radio"
                id="female"
                name="sex"
                value={1}
                onChange={(e) => handleGender(e, 1)}
                checked={dataStudent.sex === 1}
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
              value={dataStudent.dob || ""}
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
              value={dataStudent.address || ""}
              onChange={(e) => handle(e)}
              required
            />
          </div>
          <div className={cx("form-input")}>
            <label>Số điện thoại</label>
            <input
              className={cx("text-input")}
              name="phone"
              value={dataStudent.phone || ""}
              onChange={(e) => handle(e)}
              placeholder="Nhập số điện thoại ..."
              required
            />
          </div>
          <div className={cx("form-input")}>
            <input type="file" name="avatar" onChange={handleFileChange}/>
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

export default EditStudent;
