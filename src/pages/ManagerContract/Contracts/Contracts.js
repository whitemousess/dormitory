import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Contracts.module.scss';
import * as contractService from '~/services/contractService';
import { Button } from 'bootstrap-4-react/lib/components';

const cx = classNames.bind(styles);

function Contracts() {
    const [dataContract, setDataContract] = useState([]);

    useEffect(() => {
        contractService
            .getContract()
            .then((contract) => setDataContract(contract))
            .catch((err) => console.log(err));
    }, []);

    const liquidationContract = (id) => {
        contractService
            .liquidationContract({ id: id })
            .then(window.location.reload())
            .catch((err) => console.log(err));
    };

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

            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã hợp đồng</th>
                        <th>Sinh viên</th>
                        <th>Người tạo</th>
                        <th>Ngày tạo</th>
                        <th>Ngày hết hạn</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {dataContract && dataContract.length > 0 ? (
                        dataContract.map((data, index) => {
                            const formatedDate_start = formatDate(new Date(data.date_start));
                            const formatedDate_end = formatDate(new Date(data.date_end));
                            return (
                                <tr key={data._id}>
                                    <td>{index + 1}</td>
                                    <td>{data._id}</td>
                                    <td>{data.student_id.fullName}</td>
                                    <td>{data.user_id.fullName}</td>
                                    <td>{formatedDate_start}</td>
                                    <td>{formatedDate_end}</td>
                                    <td>{data.status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                                    <td>
                                        <Button
                                            onClick={() => liquidationContract(data._id)}
                                            className={cx('success')}
                                            success
                                        >
                                            Thanh lý
                                        </Button>
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
        </div>
    );
}

export default Contracts;
