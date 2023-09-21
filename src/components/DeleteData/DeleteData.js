import classNames from "classnames/bind";
import { Button, Modal } from "bootstrap-4-react/lib/components";

import styles from "./DeleteData.module.scss"

const cx = classNames.bind(styles)

function DeleteData({ deleteData }) {
  return (
    <div className={cx("modal")}>
      <Modal id="open-modal" fade>
        <Modal.Dialog centered>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Xóa thông tin này này</Modal.Title>
              <Modal.Close>
                <span className={cx("btn-close")} aria-hidden="true">&times;</span>
              </Modal.Close>
            </Modal.Header>
            <Modal.Body>Bạn có chắc xóa thông tin này.</Modal.Body>
            <Modal.Footer>
              <Button className={cx("btn-modal")} secondary data-dismiss="modal">
                Hủy
              </Button>
              <Button className={cx("btn-modal")} danger onClick={deleteData}>
                Xóa
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}

export default DeleteData;
