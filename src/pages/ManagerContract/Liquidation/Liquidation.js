import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Liquidation.module.scss';
import * as contractService from '~/services/contractService';
import { Button } from 'bootstrap-4-react/lib/components';
import { TrashIcon } from '~/components/Icons';
import DeleteData from '~/components/DeleteData';

const cx = classNames.bind(styles);

function Liquidation() {
    const [dataContract, setDataContract] = useState([]);
    const [deleteId, setDeleteId] = useState('');

    const deleteData = (e) => {
        e.preventDefault();
        contractService
            .deleteLiquidation({ id: deleteId })
            .then(window.location.reload())
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        contractService
            .getLiquidation()
            .then((contract) => setDataContract(contract))
            .catch((err) => console.log(err));
    }, []);

    // format date
    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Danh sách hợp đồng</span>

            <div className={cx('action')}>
                <span className={cx('show')}>Hiển thị</span>
                <select className={cx('show-select')}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>

            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã hợp đồng</th>
                        <th>Mã sinh viên</th>
                        <th>Người tạo</th>
                        <th>Ngày tạo</th>
                        <th>Ngày hết hạn</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {dataContract.length > 0 ? (
                        dataContract.map((data, index) => {
                            const formatedDate_start = formatDate(new Date(data.date_start));
                            const formatedDate_end = formatDate(new Date(data.date_end));
                            return (
                                <tr key={data._id}>
                                    <td>{index + 1}</td>
                                    <td>{data._id}</td>
                                    <td>{data.masv.masv}</td>
                                    <td>{data.user_id.fullName}</td>
                                    <td>{formatedDate_start}</td>
                                    <td>{formatedDate_end}</td>
                                    <td>{data.status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                                    <td>
                                        <span
                                            data-toggle="modal"
                                            data-target="#open-modal"
                                            onClick={() => setDeleteId(data._id)}
                                        >
                                            <TrashIcon className={cx('icon-action')} />
                                        </span>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td style={{ textAlign: 'center' }} colSpan={8}>
                                Chưa có hợp đồng nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <DeleteData deleteData={deleteData} />
        </div>
    );
}

export default Liquidation;
