import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import * as billService from '~/services/billService';
import styles from './ServiceBill.module.scss';

const cx = classNames.bind(styles);

function ServiceBill() {
    const [dataServiceBill, serDataServiceBill] = useState([]);

    useEffect(() => {
        billService
            .getRequestServiceAdmin()
            .then((service) => serDataServiceBill((prev) => [...prev, ...service]))
            .catch((error) => console.log(error));
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
                        <th></th>
                    </tr>
                    {dataServiceBill.length > 0 ? (
                        dataServiceBill.map((data, index) => 
                        {
                          const formattedDate = formatDate(new Date(data.createdAt));
                          return(
                            <tr key={data._id}>
                                <td>{index + 1}</td>
                                <td>{formattedDate}</td>
                                <td>{data.masv.fullName}</td>
                                <td>{data.id_service.name}</td>
                                <td>{data.status === "0" ? "Chưa thanh toán" : "Đã thanh toán"}</td>
                                <td></td>
                            </tr>
                        )})
                    ) : (
                        <tr>
                            <td colSpan={6}>Chưa có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ServiceBill;
