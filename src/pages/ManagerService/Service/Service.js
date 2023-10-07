import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button } from 'bootstrap-4-react';

import routes from '~/config/routes';
import styles from './Service.module.scss';
import * as serviceServices from '~/services/serviceService';
import { EditIcon, TrashIcon } from '~/components/Icons';
import DeleteData from '~/components/DeleteData';

const cx = classNames.bind(styles);

function Service() {
    const [dataService, setDataService] = useState([]);
    const [deleteId, setDeleteId] = useState();
    const [dataSearch, setDataSearch] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const params = new URLSearchParams(window.location.search);
    const endURL = window.location.href;
    const page = params.get('page');
    const search = params.get('search');

    const handleSearch = (e) => {
        setDataSearch(e.target.value);
    };

    const handlePageChange = (pageNumber) => {
        if (!search) {
            window.location = `${routes.ManagerService}?page=${pageNumber}`;
        } else {
            window.location = `${endURL}&page=${pageNumber}`;
        }
    };

    const submitSearch = (search) => {
        if (!page) {
            window.location = `${routes.ManagerService}?search=${search}`;
        } else if (search) {
            window.location = `${endURL}&search=${search}`;
        }
    };

    useEffect(() => {
        serviceServices
            .getService({ page: 1, perPage: 10, q: search })
            .then((service) => {
                setDataService(service.data);
                setTotalPages(service.totalPages);
            })
            .catch((error) => console.log(error));
    }, []);

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

            <div className={cx('action')}>
                <input
                    type="text"
                    value={dataSearch}
                    onChange={(e) => handleSearch(e)}
                    className={cx('search-input')}
                    placeholder="Tìm kiếm dịch vụ với tên"
                />
                <Button primary onClick={() => submitSearch(dataSearch)} className={cx('btn-search')}>
                    Tìm kiếm
                </Button>
            </div>

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
                    {dataService.map((data, index) => (
                        <tr key={data._id}>
                            <td>{index + 1}</td>
                            <td>{data.name}</td>
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
                    ))}
                </tbody>
            </table>
            {dataService.length !== 0 && (
                <div className={cx('page')}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button className={cx('btn-page')} key={index} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}

            <DeleteData deleteData={deleteData} />
        </div>
    );
}

export default Service;
