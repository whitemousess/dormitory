import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Service.module.scss';
import * as serviceServices from '~/services/serviceService';
import { EditIcon, TrashIcon } from '~/components/Icons';
import DeleteData from '~/components/DeleteData';

const cx = classNames.bind(styles);

function Service() {
    const [dataService, setDataService] = useState([]);
    const [deleteId, setDeleteId] = useState();

    useEffect(() => {
        serviceServices
            .getService({ page: 1, perPage: 10})
            .then((service) => {
                setDataService(service.data);
            })
            .catch((error) => console.log(error));
    }, []);

console.log(dataService)

    function deleteData(e) {
        e.preventDefault();
        serviceServices
            .deleteData(deleteId)
            .then((data) => window.location.reload())
            .catch((error) => console.log(error));
    }

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Danh sách dịch vụ</span>

            <table className={cx('table')}>
                <tbody>
                    <tr>
                        <th>STT</th>
                        <th>Tên dịch vụ</th>
                        <th>Mô tả</th>
                        <th>Giá dịch vụ (VND)</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                    {dataService && dataService.length > 0 ?dataService.map((data, index) => (
                        <tr key={data._id}>
                            <td>{index + 1}</td>
                            <td>{data.service_name}</td>
                            <td>{data.description}</td>
                            <td>{data.price}</td>
                            <td>
                                {data.status === 0 ? (
                                    <span className={cx('status')}>Hoạt động</span>
                                ) : (
                                    <span className={cx('status-error')}>Bảo trì</span>
                                )}
                            </td>
                            <td>
                                <Link to={`/editService/${data._id}`}>
                                    <span>
                                        <EditIcon className={cx('icon-action')} />
                                    </span>
                                </Link>
                                <span
                                    data-toggle="modal"
                                    data-target="#open-modal"
                                    onClick={() => setDeleteId(data._id)}
                                >
                                    <TrashIcon className={cx('icon-action')} />
                                </span>
                            </td>
                        </tr>
                    )): (<tr>
                        <td colSpan={5} style={{textAlign: "center"}}>Chưa có dữ liệu</td>
                    </tr>)}
                </tbody>
            </table>

            <DeleteData deleteData={deleteData} />
        </div>
    );
}

export default Service;
