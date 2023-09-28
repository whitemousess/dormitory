import { useState } from "react";
import classNames from "classnames/bind";
import { Modal, Form, Button } from "bootstrap-4-react";

import * as reportService from "~/services/reportService";
import styles from "./Reports.module.scss";
import routes from "~/config/routes";

const cx = classNames.bind(styles);

function Reports() {
  const [dataReport, setDataReport] = useState("");
  const token = localStorage.token;

  const handle = (e) => {
    e.preventDefault();
    const newData = { ...dataReport };
    newData[e.target.name] = e.target.value;
    setDataReport(newData);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!token) {
      window.location = routes.Login;
    }
    reportService
      .sentReport(dataReport)
      .then((result) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={cx("wrapper")}>
      <span className={cx("title")}>Không có thông tin báo cáo</span>

      <button
        className={cx("button")}
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Tạo báo cáo
      </button>

      {/* Modal */}
      <form onSubmit={(e) => submit(e)}>
        <Modal id="exampleModal" fade>
          <Modal.Dialog centered lg>
            <Modal.Content className={cx("modal")}>
              <Modal.Header>
                <Modal.Title className={cx("modal-title")}>
                  Thêm báo cáo
                </Modal.Title>
                <Modal.Close>
                  <span className={cx("modal-close")} aria-hidden="true">
                    &times;
                  </span>
                </Modal.Close>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <label className={cx("form-title")}>Tiêu đề</label>
                  <input
                    className={cx("form-input")}
                    type="text"
                    placeholder="Tiêu đế ..."
                    name="title"
                    value={dataReport.title || ""}
                    onChange={(e) => handle(e)}
                  />
                </Form.Group>
                <Form.Group>
                  <label className={cx("form-title")}>Nội dung </label>
                  <textarea
                    className={cx("form-textarea")}
                    name="content"
                    value={dataReport.content || ""}
                    onChange={(e) => handle(e)}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className={cx("modal-btn")}
                  secondary
                  data-dismiss="modal"
                >
                  Hủy
                </Button>
                <Button className={cx("modal-btn")} primary>
                  Gửi báo cáo
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Dialog>
        </Modal>
      </form>
    </div>
  );
}

export default Reports;
