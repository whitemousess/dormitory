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
  }

  return (
   <div className={cx("wrapper")}>    
    <span className={cx("title")}>Thêm sinh viên</span>
      <form onSubmit={(e) => submit(e)}>
        <Form.Group>
          <label>Họ và tên</label>
          <Form.Input
            name="fullName"
            value={data.fullName || ""}
            onChange={(e) => handle(e)}
            lg
            placeholder="Họ và tên ..."
            required
          />
        </Form.Group>
        <Form.Group>
          <label>Số điện thoại</label>
          <Form.Input
            name="phone"
            value={data.phone || ""}
            onChange={(e) => handle(e)}
            lg
            placeholder="Số điện thoại ..."
            required
          />
        </Form.Group>
        <Form.Select
          onChange={(e) => handle(e)}
          value={data.type || ""}
          name="type"
          className={cx("select-gender")}
          required
        >
          <option value="">Giới tính</option>
          <option value="0">Nam</option>
          <option value="1">Nữ</option>
        </Form.Select>
  
        <button className={cx("btn-add")}>
          <div className={cx("svg-wrapper-1")}>
            <div className={cx("svg-wrapper")}>
              <SentIcon />
            </div>
          </div>
          <span>Send</span>
        </button>
      </form>
   </div>
  );
}

export default AddStudent;
