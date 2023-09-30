import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import routes from '~/config/routes';
import * as serviceService from '~/services/serviceService';
import { SentIcon } from '~/components/Icons';
import styles from './EditService.module.scss';

const cx = classNames.bind(styles);

function EditService() {
    const [dataService, setDataService] = useState({});
    const Id = window.location.href.split('/').pop();

    const submit = async (e) => {
        e.preventDefault();
        serviceService
            .editService({ id: Id, data: dataService })
            .then(() => {
                window.location = routes.ManagerService;
            })
            .catch((err) => console.log(err));
    };

    const handle = (e) => {
        const newData = { ...dataService };
        newData[e.target.name] = e.target.value;
        setDataService(newData);
    };

    useEffect(() => {
        serviceService
            .getServiceId(Id)
            .then((result) => {
                setDataService(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Sửa</span>
            <div className={cx('content')}>
                <div className={cx('content-left')}></div>

                <form onSubmit={(e) => submit(e)} className={cx('content-right')}>
                    <div className={cx('form-input')}>
                        <label>Tên dịch vụ</label>
                        <input
                            className={cx('text-input')}
                            name="name"
                            value={dataService.name || ''}
                            onChange={(e) => handle(e)}
                            placeholder="Tên dịch vụ ..."
                            required
                        />
                    </div>
                    <div className={cx('form-input')}>
                        <label>Mô tả</label>
                        <input
                            className={cx('text-input')}
                            name="description"
                            value={dataService.description || ''}
                            onChange={(e) => handle(e)}
                            placeholder="Mô tả ..."
                            required
                        />
                    </div>

                    <div className={cx('form-input')}>
                        <label>Giá dịch vụ</label>
                        <input
                            className={cx('text-input')}
                            name="price"
                            value={dataService.price || ''}
                            onChange={(e) => handle(e)}
                            placeholder="Giá dịch vụ ..."
                            required
                        />
                    </div>

                    <div className={cx('form-input')}>
                        <label>Trạng thái</label>
                        <select
                            onChange={(e) => handle(e)}
                            value={dataService.status}
                            name="status"
                            className={cx('text-input')}
                            required
                        >
                            <option value={'0'}>Hoạt động</option>
                            <option value={'1'}>Bảo trì</option>
                        </select>
                    </div>
                    <div className={cx('svg-wrapper-1')}>
                        <button className={cx('btn-add')}>
                            <div className={cx('svg-wrapper')}>
                                <SentIcon />
                            </div>
                            <span>Sửa</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditService;
