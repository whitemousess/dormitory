import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import * as billService from '~/services/billService';
import styles from './ServiceBill.module.scss';
import { TrashIcon } from '~/components/Icons';
import DeleteData from '~/components/DeleteData';

const cx = classNames.bind(styles);

function ServiceBill() {
    const [dataServiceBill, serDataServiceBill] = useState([]);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        billService
            .getRequestServiceAdmin()
            .then((service) => serDataServiceBill((prev) => [...prev, ...service]))
            .catch((error) => console.log(error));
    }, []);

    function deleteData(e) {
        e.preventDefault();
        billService
            .deleteRequestService({ id: deleteId })
            .then(window.location.reload())
            .catch((error) => console.log(error));
    }

    // format date
    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Danh sách hóa đơn</span>

            <div className={cx('action')}>
                <span className={cx('show')}>Hiển thị</span>
                <select className={cx('show-select')}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>

            <table className={cx('table')}>
                <tbody>
                    <tr>
                        <th>STT</th>
                        <th>Ngày tạo</th>
                        <th>Người yêu cầu</th>
                        <th>Tên dịch vụ</th>
                        <th>Trạng thái</th>
                    </tr>
                    {dataServiceBill.length > 0 ? (
                        dataServiceBill.map((data, index) => {
                            const formattedDate = formatDate(new Date(data.createdAt));
                            return (
                                <tr key={data._id}>
                                    <td>{index + 1}</td>
                                    <td>{formattedDate}</td>
                                    <td>{data.masv.fullName}</td>
                                    <td>{data.id_service.name}</td>
                                    <td>{data.status === '0' ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                                    {data.status === '1' ? (
                                        <td>
                                            <span
                                                data-toggle="modal"
                                                data-target="#open-modal"
                                                onClick={() => setDeleteId(data._id)}
                                            >
                                                <TrashIcon className={cx('icon-action')} />
                                            </span>
                                        </td>
                                    ) : null}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td style={{textAlign: 'center'}} colSpan={6}>Chưa có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <DeleteData deleteData={deleteData} />
        </div>
    );
}

export default ServiceBill;
