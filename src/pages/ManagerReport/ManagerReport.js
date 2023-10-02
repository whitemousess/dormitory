import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Button } from 'bootstrap-4-react/lib/components';

import * as reportService from '~/services/reportService';
import styles from './ManagerReport.module.scss';
import { TrashIcon } from '~/components/Icons';
import DeleteData from '~/components/DeleteData';

const cx = classNames.bind(styles);

function ManagerReport() {
    const [dataReport, setDataReport] = useState([]);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        reportService.getAllReports().then((report) => setDataReport((preData) => [...preData, ...report]));
    }, []);

    const successReport = (id) => {
        const status = {status: "1"};
        reportService.success({id: id,data: status})
        .then((report) => window.location.reload());
    };

    function deleteData(e) {
        e.preventDefault();
        reportService
            .deleteReport(deleteId)
            .then((account) => window.location.reload())
            .catch((error) => console.log({ error: error }));
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
            <span className={cx('title')}>Danh sách báo cáo</span>

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
                        <th>Mã sinh viên</th>
                        <th>Tên sinh viên</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Thời gian</th>
                        <th></th>
                    </tr>

                    {dataReport.length !== 0 ? (
                        dataReport.map((report, index) => {
                            const formattedDate = formatDate(new Date(report.createdAt));
                            return (
                                <tr key={report._id}>
                                    <td>{index + 1}</td>
                                    <td>{report.ma_sv.masv}</td>
                                    <td>{report.ma_sv.fullName}</td>
                                    <td>{report.title}</td>
                                    <td>{report.content}</td>
                                    <td>{formattedDate}</td>
                                    <td>
                                        {report.status === 0 ? (
                                            <Button
                                                onClick={() => successReport(report._id)}
                                                className={cx('success')}
                                                success
                                            >
                                                Xác nhận
                                            </Button>
                                        ) : (
                                            'Đã xác nhận'
                                        )}
                                        <span
                                            data-toggle="modal"
                                            data-target="#open-modal"
                                            onClick={() => setDeleteId(report._id)}
                                        >
                                            <TrashIcon className={cx('icon-action')} />
                                        </span>
                                    </td>
                                </tr>
                            );
                        })
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
        </div>
    );
}

export default ManagerReport;
