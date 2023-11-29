import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import * as billElectricService from '~/services/billElectricService';
import { SentIcon } from '~/components/Icons';
import styles from './EditElectric.module.scss';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function EditElectric() {
    const [data, setData] = useState({});
    const params = new URLSearchParams(window.location.search);
    const bill_EW = params.get('bill_EW');

    const submit = (e) => {
        e.preventDefault();
        billElectricService
            .editElectric({ bill_id: bill_EW, data: data })
            .then((data) => {
                if (data) {
                    window.location = routes.BillElectric;
                }
            })
            .catch((err) => console.log(err));
    };

    function handleConvert(e) {
        const newData = { ...data };
        newData[e.target.name] = parseInt(e.target.value);
        setData(newData);
    }

    function handle(e) {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);
    }

    useEffect(() => {
        billElectricService.getOneElectric({ bill_EW: bill_EW }).then((electric) => {
            setData(electric);
        });
    }, [bill_EW]);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Sửa</span>
            <div className={cx('content')}>
                <div className={cx('content-left')}></div>

                <form onSubmit={(e) => submit(e)} className={cx('content-right')}>
                    <div className={cx('form-input')}>
                        <label>Số điện đầu tiên</label>
                        <input
                            type="number"
                            min="0"
                            className={cx('text-input')}
                            name="e_first"
                            value={data.e_first || ''}
                            onChange={(e) => handleConvert(e)}
                            required
                        />
                    </div>

                    <div className={cx('form-input')}>
                        <label>Số điện cuối</label>
                        <input
                            type="number"
                            min="0"
                            className={cx('text-input')}
                            name="e_last"
                            value={data.e_last || ''}
                            onChange={(e) => handleConvert(e)}
                            required
                        />
                    </div>

                    <div className={cx('form-input')}>
                        <label>Số tiền trên 1 số</label>
                        <input
                            type="number"
                            min="0"
                            className={cx('text-input')}
                            name="price_per_e"
                            value={data.price_per_e || ''}
                            onChange={(e) => handleConvert(e)}
                            required
                        />
                    </div>

                    <div className={cx('form-input')}>
                        <label>Số nước đầu tiên</label>
                        <input
                            type="number"
                            min="0"
                            className={cx('text-input')}
                            name="w_first"
                            value={data.w_first || ''}
                            onChange={(e) => handleConvert(e)}
                            required
                        />
                    </div>

                    <div className={cx('form-input')}>
                        <label>Số nước cuối</label>
                        <input
                            type="number"
                            min="0"
                            className={cx('text-input')}
                            name="w_last"
                            value={data.w_last || ''}
                            onChange={(e) => handleConvert(e)}
                            required
                        />
                    </div>

                    <div className={cx('form-input')}>
                        <label>Số tiền trên 1 số</label>
                        <input
                            type="number"
                            min="0"
                            className={cx('text-input')}
                            name="price_per_w"
                            value={data.price_per_w || ''}
                            onChange={(e) => handleConvert(e)}
                            required
                        />
                    </div>

                    <div className={cx('form-input')}>
                        <label>Ngày bắt đầu</label>
                        <input
                            className={cx('text-input')}
                            type="date"
                            name="date_start"
                            value={data.date_start || ''}
                            onChange={(e) => handle(e)}
                            required
                        />
                    </div>

                    <div className={cx('form-input')}>
                        <label>Ngày hết hạn</label>
                        <input
                            className={cx('text-input')}
                            type="date"
                            name="date_end"
                            value={data.date_end || ''}
                            onChange={(e) => handle(e)}
                            required
                        />
                    </div>

                    <div className={cx('form-input')}>
                        <label>Trạng thái thanh toán :</label>
                        <select
                            onChange={(e) => handleConvert(e)}
                            value={data.status}
                            name="status"
                            className={cx('text-input')}
                        >
                            <option value={0}>Chưa thanh toán</option>
                            <option value={1}>Đã thanh toán</option>
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

export default EditElectric;
