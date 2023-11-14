import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ElectricityBill.module.scss';
import * as billElectricService from '~/services/billElectricService';
import { EditIcon, ShowIcon, TrashIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import DeleteData from '~/components/DeleteData';
import { Button, Modal } from 'bootstrap-4-react/lib/components';

const cx = classNames.bind(styles);

function ElectricityBill() {
    const [dataElectric, setDataElectric] = useState([]);
    const [dataModal, setDataModal] = useState({});
    const [billId, setBillId] = useState('');

    const deleteData = (e) => {
        e.preventDefault();
        billElectricService
            .deleteElectric({ bill_id: billId })
            .then(window.location.reload())
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        billElectricService
            .getAllElectric()
            .then((electric) => setDataElectric(electric))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Danh sách hóa đơn</span>

            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Phòng</th>
                        <th>Số điện sử dụng</th>
                        <th>Số nước sử dụng</th>
                        <th>Từ ngày</th>
                        <th>Đến ngày</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {dataElectric.length > 0 ? (
                        dataElectric.map((data, index) => (
                            <tr key={data._id}>
                                <td>{index + 1}</td>
                                <td>{data ? data.room_id.room_name : 'Cập nhật số phòng!'}</td>
                                <td>{data.e_last - data.e_first}</td>
                                <td>{data.w_last - data.w_first}</td>
                                <td>{data.date_start}</td>
                                <td>{data.date_end}</td>
                                <td>
                                    {data.status === 0 ? (
                                        <span className={cx('status-error')}>Chưa thanh toán</span>
                                    ) : (
                                        <span className={cx('status')}>Đã thanh toán</span>
                                    )}
                                </td>
                                <td className={cx('action')}>
                                    <span
                                        onClick={() => setDataModal(data)}
                                        data-toggle="modal"
                                        data-target="#show-data"
                                    >
                                        <ShowIcon className={cx('icon-action')} />
                                    </span>
                                    <Link to={`/bill/editElectricity?bill_EW=${data._id}`}>
                                        <span>
                                            <EditIcon className={cx('icon-action')} />
                                        </span>
                                    </Link>
                                    {data.status === 1 && (
                                        <span
                                            onClick={() => {
                                                setBillId(data._id);
                                            }}
                                            data-toggle="modal"
                                            data-target="#open-modal"
                                        >
                                            <TrashIcon className={cx('icon-action')} />
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td style={{ textAlign: 'center' }} colSpan="6">
                                Chưa có thông tin nào !
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <DeleteData deleteData={deleteData} />

            <div className={cx('show-modal')}>
                <Modal id="show-data" fade>
                    <Modal.Dialog centered>
                        <Modal.Content>
                            <Modal.Header>
                                <Modal.Title>Thông tin chi tiết</Modal.Title>
                                <Modal.Close>
                                    <span className={cx('btn-close')} aria-hidden="true">
                                        &times;
                                    </span>
                                </Modal.Close>
                            </Modal.Header>
                            <Modal.Body>
                                <div className={cx('modal-info')}>
                                    <strong>Mã hóa đơn : </strong> {dataModal._id}
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Số phòng : </strong> {dataModal.room_id && dataModal.room_id.room_name}
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Số điện sử dụng : </strong> {dataModal.e_last - dataModal.e_first}
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Số nước sử dụng : </strong> {dataModal.w_last - dataModal.w_first}
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Từ ngày : </strong> {dataModal.date_start}
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Đến ngày : </strong> {dataModal.date_end}
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button secondary className={cx('btn-modal')} data-dismiss="modal">
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal.Dialog>
                </Modal>
            </div>
        </div>
    );
}

export default ElectricityBill;
