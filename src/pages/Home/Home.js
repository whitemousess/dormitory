import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, useState } from 'react';
import * as studentService from '~/services/studentService';
import * as userService from '~/services/userService';
import * as roomService from '~/services/roomService';

const cx = classNames.bind(styles);

function Home() {
    const [dataStudent, setDataStudent] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [dataRoom, setDataRoom] = useState([]);

    useEffect(() => {
        studentService.getStudents({page: 1}).then((student) => setDataStudent(student.data));
        userService.getAllUsers({page: 1}).then((user) => setDataUser(user.data));
        roomService.getRoomManager({page: 1}).then((user) => setDataRoom(user.data));
    }, []);

    function countRoomEmpty() {
        var count = 0;
        for (const room of dataRoom) {
            if (room.count_students.length === 0) {
                count++;
            }
        }
        return count;
    }

    function countRoomFull() {
        var count = 0;
        for (const room of dataRoom) {
            if (room.count_students.length < room.max_number) {
                count++;
            }
        }
        return count;
    }

    return (
        <div className={cx('wrapper')}>
            <span className={cx('header')}>Trang chủ</span>

            <div className={cx('Data')}>
                Số liệu sinh viên
                <div className={cx('box')}>
                    <span className={cx('title')}> Tổng số sinh viên</span>
                    <span className={cx('count')}>{dataStudent.length}</span>
                </div>
            </div>

            <div className={cx('Data')}>
                Số liệu phòng
                <div className={cx('df')}>
                    <div className={cx('box')}>
                        <span className={cx('title')}>Tổng số phòng</span>
                        <span className={cx('count')}>{dataRoom.length}</span>
                    </div>

                    <div className={cx('box')}>
                        <span className={cx('title')}>Tổng số phòng trống</span>
                        <span className={cx('count')}>{countRoomEmpty()}</span>
                    </div>

                    <div className={cx('box')}>
                        <span className={cx('title')}>Phòng chưa ghép đủ</span>
                        <span className={cx('count')}>{countRoomFull()}</span>
                    </div>
                </div>
            </div>

            <div className={cx('Data')}>
                Số liệu người dùng
                <div className={cx('df')}>
                    <div className={cx('box')}>
                        <span className={cx('title')}>Tổng số người dùng</span>
                        <span className={cx('count')}>{dataStudent.length + dataUser.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
