import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import routes from '~/config/routes';
import * as contractService from '~/services/contractService';
import * as studentService from '~/services/studentService';
import * as roomService from '~/services/roomService';
import styles from './AddContract.module.scss';
import { SentIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function AddContract() {
    const [data, setData] = useState({});
    const [selectStudent, setSelectStudent] = useState([]);
    const [area, setArea] = useState('');
    const [selectRoom, setSelectRoom] = useState([]);

    const submit = async (e) => {
        e.preventDefault();
        contractService.createContract(data).then((window.location = routes.ManagerContract));
    };

    function handle(e) {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);
    }

    function handleSelect(e) {
        const selectedValue = e.target.value;
        const [selectedId, selectedGender] = selectedValue.split(',');
        const newData = { masv: selectedId };
        setData(newData);
        setArea(parseInt(selectedGender));
    }

    useEffect(() => {
        studentService.getStudents().then((students) => setSelectStudent(students));
        roomService.getRoomManager().then((roomManager) => setSelectRoom(roomManager));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Thêm hợp đồng </span>
            <div className={cx('content')}>
                <div className={cx('content-left')}></div>

                <form onSubmit={(e) => submit(e)} className={cx('content-right')}>
                    <div className={cx('form-input')}>
                        <select onChange={(e) => handleSelect(e)} name="masv" className={cx('text-input')} required>
                            <option value="">Sinh viên</option>
                            {selectStudent.map((data) => {
                                if (
                                    data.count_contract.length === 0 ||
                                    data.count_contract.every((contract) => contract.liquidation === 1)
                                ) {
                                    return (
                                        <option key={data._id} value={`${data._id},${data.gender}`}>
                                            {data.masv} - {data.fullName}
                                        </option>
                                    );
                                }
                                return null;
                            })}
                        </select>
                    </div>

                    <div className={cx('form-input')}>
                        <select onChange={(e) => handle(e)} name="room_id" className={cx('text-input')} required>
                            <option value="">Phòng</option>
                            {selectRoom.map((data) => {
                                const countStudentsWithLiquidationZero = data.count_students.filter(
                                    (student) => student.liquidation === 0,
                                ).length;
                                return (
                                    data.status === 0 &&
                                    countStudentsWithLiquidationZero < data.max_number &&
                                    data.area === area && (
                                        <option key={data._id} value={data._id}>
                                            {data.room_name} - Phòng cho {data.area === 0 ? 'Nam' : 'Nữ'}
                                        </option>
                                    )
                                );
                            })}
                        </select>
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

export default AddContract;
