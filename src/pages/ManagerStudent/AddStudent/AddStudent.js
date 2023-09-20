import classNames from "classnames/bind";
import { Modal, Form, Button } from "bootstrap-4-react";
import styles from "./AddStudent.module.scss"

const cx =classNames.bind(styles)

function AddStudent() {
    return ( <div>{/* Modal */}
    <Modal id="addStudent" fade>
      <Modal.Dialog centered lg>
        <Modal.Content className={cx("modal")}>
          <Modal.Header>
            <Modal.Title className={cx("modal-title")}>
              Thêm sinh viên
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
              />
            </Form.Group>
            <Form.Group>
              <label className={cx("form-title")}>Nội dung </label>
              <textarea className={cx("form-textarea")} />
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
    </Modal></div> );
}

export default AddStudent;