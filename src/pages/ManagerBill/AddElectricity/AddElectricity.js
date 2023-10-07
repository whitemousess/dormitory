import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import routes from '~/config/routes';
import * as billElectricService from '~/services/billElectricService';
import * as roomService from '~/services/roomService';
import styles from './AddElectricity.module.scss';
import { SentIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function AddElectricity() {
    const [data, setData] = useState({});
    const [selectRoom, setSelectRoom] = useState([]);

    const submit = async (e) => {
        e.preventDefault();
        billElectricService
            .createElectric({ data: data })
            .then((window.location = routes.BillElectric))
            .catch((error) => console.log(error));
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
        roomService.getRoomManager({page: 1}).then((roomManager) => setSelectRoom(roomManager.data));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Thêm hợp đồng </span>
            <div className={cx('content')}>
                <div className={cx('content-left')}></div>

                <form onSubmit={(e) => submit(e)} className={cx('content-right')}>
                    <div className={cx('form-input')}>
                        <select onChange={(e) => handle(e)} name="room_id" className={cx('text-input')} required>
                            <option value="">Phòng</option>
                            {selectRoom.map((data) => (
                                <option key={data._id} value={data._id}>
                                    {data.room_name}
                                </option>
                            ))}
                        </select>
                    </div>

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

export default AddElectricity;
