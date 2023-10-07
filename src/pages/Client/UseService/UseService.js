import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Modal, Form, Button } from 'bootstrap-4-react';

import * as billService from '~/services/billService';
import * as serviceService from '~/services/serviceService';
import styles from './UseService.module.scss';
import { PayIcon } from '~/components/Icons';

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
            .then((request) => window.location.reload())
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        serviceService.getService({page: 1}).then((service) => setDataSelect(service.data));
        billService.getServiceUser().then((service) => setDataClient(service));
    }, []);

    // format date
    function formatDate(date) {
        const hour = date.getHours();
        const minute = date.getMinutes();
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
        const year = date.getFullYear();
        return `${hour}:${minute} - ${day}/${month}/${year}`;
    }
    
    return (
        <div className={cx('wrapper')}>
            {dataClient.length > 0 ? (
                <>
                    <table className={cx('table')}>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Ngày tạo</th>
                                <th>Tên dịch vụ</th>
                                <th>Giá</th>
                                <th>Trạng thái</th>
                            </tr>
                            {dataClient.map((data, index) => {
                                const formattedDate = formatDate(new Date(data.createdAt));
                                return (
                                    <tr key={data._id}>
                                        <td>{index + 1}</td>
                                        <td>{formattedDate}</td>
                                        <td>{data.id_service.name}</td>
                                        <td>{data.id_service.price}</td>
                                        <td>{data.status === '0' ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            ) : (
                <span className={cx('title')}>Không có dịch vụ</span>
            )}

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
                                        name="id_service"
                                        className={cx('form-input')}
                                        required
                                    >
                                        <option className={cx('form-input')} value="">
                                            Chọn dịch vụ
                                        </option>
                                        {dataSelect.map((data) =>
                                            data.status === '0' ? (
                                                <option key={data._id} className={cx('form-input')} value={data._id}>
                                                    {data.name}
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
