import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap-4-react';
import { Modal } from 'bootstrap-4-react/lib/components';

import DeleteData from '~/components/DeleteData';
import styles from './RoomManager.module.scss';
import * as roomService from '~/services/roomService';
import { EditIcon, ShowIcon, TrashIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function RoomManager() {
    const [dataRoom, setDataRoom] = useState([]);
    const [deleteId, setDeleteId] = useState('');
    const [oneDataStudent, setOneDataStudent] = useState('');

    function deleteData(e) {
        e.preventDefault();
        roomService
            .deleteRoom(deleteId)
            .then(() => window.location.reload())
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        roomService.getRoomManager().then((Room) => setDataRoom((preV) => [...preV, ...Room]));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Danh sách Phòng</span>

            <div className={cx('action')}>
                <span className={cx('show')}>Hiển thị</span>
                <select className={cx('show-select')}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>

            <table className={cx('table')}>
                <tbody>
                    <tr>
                        <th>STT</th>
                        <th>Tên phòng</th>
                        <th>Người quản lý</th>
                        <th>Giá phòng(VND)</th>
                        <th>Khu</th>
                        <th>Số lượng</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>

                    {dataRoom.length > 0 ? (
                        dataRoom.map((Room, index) => {
                            const countStudentsWithLiquidationZero = Room.count_students.filter(
                                (student) => student.liquidation === 0,
                            ).length;
                            return (
                                <tr key={Room._id}>
                                    <td>{index + 1}</td>
                                    <td>{Room.room_name}</td>
                                    <td>{Room.user_data ? Room.user_data[0].fullName : 'Chưa có người quản lý'}</td>
                                    <td>{Room.price}</td>
                                    <td>{Room.area === 0 ? 'Nam' : 'Nữ'}</td>
                                    <td>
                                        {countStudentsWithLiquidationZero + '/' + Room.max_number}
                                        {countStudentsWithLiquidationZero === Room.max_number ? (
                                            <span className={cx('status')}>Đủ</span>
                                        ) : (
                                            <span className={cx('status-error')}>Thiếu</span>
                                        )}
                                    </td>
                                    <td>
                                        {Room.status === 0 ? (
                                            <span className={cx('status')}>Hoạt động</span>
                                        ) : (
                                            <span className={cx('status-error')}>Bảo trì</span>
                                        )}
                                    </td>
                                    <td>
                                        <span
                                            onClick={() => setOneDataStudent(Room.info_student)}
                                            data-toggle="modal"
                                            data-target="#show-data"
                                        >
                                            <ShowIcon className={cx('icon-action')} />
                                        </span>
                                        <Link to={`/editRoom/${Room._id}`}>
                                            <span>
                                                <EditIcon className={cx('icon-action')} />
                                            </span>
                                        </Link>
                                        <span
                                            data-toggle="modal"
                                            data-target="#open-modal"
                                            onClick={() => setDeleteId(Room._id)}
                                        >
                                            <TrashIcon className={cx('icon-action')} />
                                        </span>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={8} style={{ textAlign: 'center' }}>
                                Chưa có phòng nào !
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <DeleteData deleteData={deleteData} />

            <div className={cx('show-modal')}>
                <Modal id="show-data" fade>
                    <Modal.Dialog centered sm>
                        <Modal.Content>
                            <Modal.Header>
                                <Modal.Title>Thông tin chi tiết</Modal.Title>
                                <Modal.Close>
                                    <span className={cx('btn-close')} aria-hidden="true">
                                        &times;
                                    </span>
                                </Modal.Close>
                            </Modal.Header>
                            <Modal.Body>
                                {console.log(oneDataStudent)}
                                {oneDataStudent &&
                                    oneDataStudent.map((data) => (
                                        <div key={data._id} className={cx('modal-info')}>
                                            <img className={cx('avatar')} src={data.avatarUrl} alt='' />
                                            {data.fullName}
                                        </div>
                                    ))}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button secondary className={cx('btn-modal')} data-dismiss="modal">
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal.Dialog>
                </Modal>
            </div>
        </div>
    );
}

export default RoomManager;
