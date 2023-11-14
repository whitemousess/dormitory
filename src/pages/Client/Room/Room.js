import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Room.module.scss';
import * as roomService from '~/services/roomService';

const cx = classNames.bind(styles);

function Room() {
    const [dataRoom, setDataRoom] = useState([]);

    useEffect(() => {
        roomService
            .getStudentInRoom()
            .then((room) => setDataRoom(room))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h1 className="text-5xl font-bold text-center m-10">Danh sách thành viên trong phòng</h1>
            <div className="container flex flex-wrap">
                {dataRoom && dataRoom.length > 0 ? (
                    dataRoom.map((data) => (
                        <div
                            key={data.student_id._id}
                            className="w-96 border-[1px] m-4 border-gray-400 rounded-2xl overflow-hidden"
                        >
                            <img className='h-[250px] w-full object-cover' src={data.student_id.avatarUrl} alt={data.student_id.fullName} />
                            <p className="text-center text-2xl font-semibold text-gray-800 p-4">
                                {data.student_id.fullName}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className={cx('title')}>Chưa có phòng </div>
                )}
            </div>
        </div>
    );
}

export default Room;
