import classNames from 'classnames/bind';
import { useState } from 'react';

import routes from '~/config/routes';
import * as serviceService from '~/services/serviceService';
import styles from './AddService.module.scss';
import { SentIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function AddService() {
    const [data, setData] = useState({});
    const submit = (e) => {
        e.preventDefault();
        serviceService
            .createService(data)
            .then((data) => {
                if (data) {
                    window.location = routes.ManagerService;
                }
            })
            .catch((err) => console.log(err));
    };

    function handle(e) {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);
    }

    function handleConvert(e) {
        const newData = { ...data };
        newData[e.target.name] = parseInt(e.target.value);
        setData(newData);
    }

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Thêm dịch vụ </span>
            <div className={cx('content')}>
                <div className={cx('content-left')}></div>

                <form onSubmit={(e) => submit(e)} className={cx('content-right')}>
                    <div className={cx('form-input')}>
                        <label>Tên dịch vụ</label>
                        <input
                            className={cx('text-input')}
                            name="service_name"
                            value={data.service_name || ''}
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
                            value={data.description || ''}
                            onChange={(e) => handle(e)}
                            placeholder="Mô tả ..."
                        />
                    </div>

                    <div className={cx('form-input')}>
                        <label>Giá dịch vụ</label>
                        <input
                            className={cx('text-input')}
                            name="price"
                            value={data.price || ''}
                            onChange={(e) => handleConvert(e)}
                            placeholder="Giá dịch vụ ..."
                            required
                        />
                    </div>

                    <div className={cx('form-input')}>
                        <label>Trạng thái</label>
                        <select
                            onChange={(e) => handleConvert(e)}
                            value={data.status}
                            name="status"
                            className={cx('text-input')}
                            required
                        >
                            <option value={0}>Hoạt động</option>
                            <option value={1}>Bảo trì</option>
                        </select>
                    </div>

                    <div className={cx('svg-wrapper-1')}>
                        <button className={cx('btn-add')}>
                            <div className={cx('svg-wrapper')}>
                                <SentIcon />
                            </div>
                            <span>Thêm</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddService;
