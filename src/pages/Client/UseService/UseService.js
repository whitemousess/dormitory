import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Modal, Form, Button } from 'bootstrap-4-react';

import * as billService from '~/services/billService';
import * as serviceService from '~/services/serviceService';
import styles from './UseService.module.scss';

const cx = classNames.bind(styles);

function UseService() {
    const [dataService, setDataService] = useState('');
    const [dataClient, setDataClient] = useState([]);
    const [dataSelect, setDataSelect] = useState([]);

    const handle = (e) => {
        e.preventDefault();
        const newData = { ...dataService };
        newData[e.target.name] = e.target.value;
        setDataService(newData);
    };

    const submit = (e) => {
        e.preventDefault();
        billService
            .requestService({ data: dataService })
            .then(window.location.reload())
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        billService
            .getServiceUser()
            .then((user) => setDataClient(user))
            .catch((error) => console.log(error));
        serviceService
            .getService()
            .then((service) => setDataSelect(service))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <table className={cx('table')}>
                <tbody>
                    <tr>
                        <th>STT</th>
                        <th>Tên dịch vụ</th>
                        <th>Số điện thoại</th>
                        <th>Giá</th>
                        <th>Trạng thái</th>
                    </tr>
                    {dataClient && dataClient.length > 0 ? (
                        dataClient.map((data, index) => {
                            return (
                                <tr key={data._id}>
                                    <td>{index + 1}</td>
                                    <td>{data.service_id.service_name}</td>
                                    <td>{data.phone}</td>
                                    <td>{data.service_id.price}</td>
                                    <td>{data.status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">
                                Không có dịch vụ
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className={cx('button')} data-toggle="modal" data-target="#exampleModal">
                Yêu cầu dịch vụ
            </button>

            {/* Modal */}
            <form onSubmit={(e) => submit(e)}>
                <Modal id="exampleModal" fade>
                    <Modal.Dialog centered lg>
                        <Modal.Content className={cx('modal')}>
                            <Modal.Header>
                                <Modal.Title className={cx('modal-title')}>Yêu cầu dịch vụ</Modal.Title>
                                <Modal.Close>
                                    <span className={cx('modal-close')} aria-hidden="true">
                                        &times;
                                    </span>
                                </Modal.Close>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group>
                                    <label className={cx('form-title')}>Số điện thoại</label>
                                    <input
                                        className={cx('form-input')}
                                        type="number"
                                        placeholder="Số điện thoại liên hệ ..."
                                        name="phone"
                                        value={dataService.phone || ''}
                                        onChange={(e) => handle(e)}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <select
                                        onChange={(e) => handle(e)}
                                        name="service_id"
                                        className={cx('form-input')}
                                        required
                                    >
                                        <option className={cx('form-input')} value="">
                                            Chọn dịch vụ
                                        </option>
                                        {dataSelect.map((data) =>
                                            data.status === 0 ? (
                                                <option key={data._id} className={cx('form-input')} value={data._id}>
                                                    {data.service_name}
                                                </option>
                                            ) : null,
                                        )}
                                    </select>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className={cx('modal-btn')} secondary data-dismiss="modal">
                                    Hủy
                                </Button>
                                <Button className={cx('modal-btn')} primary>
                                    Gửi yêu cầu
                                </Button>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal.Dialog>
                </Modal>
            </form>
        </div>
    );
}

export default UseService;
