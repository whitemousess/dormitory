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
    const [contract, setContract] = useState([]);
    const [student, setStudent] = useState([]);
    const [area, setArea] = useState('');
    const [selectRoom, setSelectRoom] = useState([]);

    const submit = async (e) => {
        e.preventDefault();
        contractService.createContract(data).then((data) => {
            if (data) {
                window.location = routes.ManagerContract;
            }
        });
    };

    function handle(e) {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);
    }

    useEffect(() => {
        studentService.getStudents({ page: 1 }).then((students) => setStudent(students.data));
        roomService.getRoomManager({ page: 1 }).then((roomManager) => setSelectRoom(roomManager.data));
        contractService
            .getContract()
            .then((contract) => setContract(contract))
            .catch((error) => console.log(error));
    }, []);

    function handleSelect(e) {
        const selectedValue = e.target.value;
        const [selectedId, selectedGender] = selectedValue.split(',');
        const newData = { student_id: selectedId };
        setData(newData);
        setArea(parseInt(selectedGender));
    }

    function findStudents() {
        let students = [];

        student.forEach((studentItem) => {
            const hasContract = contract.some((contractItem) => studentItem._id === contractItem.student_id._id);

            if (!hasContract) {
                students.push(studentItem);
            }
        });

        return students;
    }

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Thêm hợp đồng </span>
            <div className={cx('content')}>
                <div className={cx('content-left')}></div>

                <form onSubmit={(e) => submit(e)} className={cx('content-right')}>
                    <div className={cx('form-input')}>
                        <select
                            onChange={(e) => handleSelect(e)}
                            name="student_id"
                            className={cx('text-input')}
                            required
                        >
                            <option value="">Sinh viên</option>
                            {findStudents().map((student) => {
                                return (
                                    <option key={student._id} value={`${student._id},${student.gender}`}>
                                        {student.user_id} - {student.fullName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className={cx('form-input')}>
                        <select onChange={(e) => handle(e)} name="room_id" className={cx('text-input')} required>
                            <option value="">Phòng</option>
                            {selectRoom.map((room) => {
                                if (
                                    room.count_student.length < room.max_number &&
                                    room.status === 0 &&
                                    room.area === area
                                ) {
                                    return (
                                        <option key={room._id} value={room._id}>
                                            {room.room_name} - Phòng cho {room.area === 0 ? 'Nam' : 'Nữ'}
                                        </option>
                                    );
                                }
                                return null;
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
