import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap-4-react';
import { Modal } from 'bootstrap-4-react/lib/components';

import DeleteData from '~/components/DeleteData';
import styles from './RoomManager.module.scss';
import * as roomService from '~/services/roomService';
import * as billRoomService from '~/services/billRoomService';
import { EditIcon, ShowIcon, TrashIcon } from '~/components/Icons';
const cx = classNames.bind(styles);

function RoomManager() {
    const [dataRoom, setDataRoom] = useState([]);
    const [dataBillRoom, setDataBillRoom] = useState([]);
    const [deleteId, setDeleteId] = useState('');
    const [oneDataStudent, setOneDataStudent] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const params = new URLSearchParams(window.location.search);
    const endURL = window.location.href;
    const page = params.get('page');

    const handlePageChange = (pageNumber) => {
        window.location = `${endURL}&page=${pageNumber}`;
    };

    function deleteData(e) {
        e.preventDefault();
        roomService
            .deleteRoom(deleteId)
            .then(data => {
                if(data){
                    window.location.reload();
                }
            })
            .catch((error) => console.log(error));
    }

    function addBillRoom(room_id) {
        billRoomService
            .createBillRoom({ room_id: room_id })
            .then(data => {
                if(data){
                    window.location.reload();
                }
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        roomService
            .getRoomManager({ page: page, perPage: 10 })
            .then((Room) => {
                setDataRoom((preV) => [...preV, ...Room.data]);
                setTotalPages(Room.totalPages);
            })
            .catch((error) => console.log(error));

        billRoomService
            .getAllBill({ status: 0 })
            .then((BillRoom) => {
                setDataBillRoom(BillRoom);
            })
            .catch((error) => console.log(error));
    }, [page]);

    function Check(id) {
        let Bill;

        dataBillRoom.forEach((BillRoom) => {
            if (BillRoom.room_id && BillRoom.room_id._id === id) {
                Bill = BillRoom.room_id._id === id;
            }
        });

        return Bill;
    }

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Danh sách Phòng</span>

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
                        <th>Hóa đơn</th>
                        <th></th>
                    </tr>

                    {dataRoom.length > 0 ? (
                        dataRoom.map((Room, index) => {
                            return (
                                <tr key={Room._id}>
                                    <td>{index + 1}</td>
                                    <td>{Room.room_name}</td>
                                    <td>{Room.user_id ? Room.user_id.fullName : 'Chưa có người quản lý'}</td>
                                    <td>{Room.price}</td>
                                    <td>{Room.area === 0 ? 'Nam' : 'Nữ'}</td>
                                    <td>
                                        {Room.count_student.length + '/' + Room.max_number}
                                        {Room.count_student.length === Room.max_number ? (
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
                                        {Check(Room._id) ? (
                                            'Hóa đơn đã tồn tại'
                                        ) : Room.status === 0 ? (
                                            <span
                                                onClick={() => {
                                                    addBillRoom(Room._id);
                                                }}
                                                className="btn btn-success text-xl"
                                            >
                                                Thêm hòa đơn
                                            </span>
                                        ) : (
                                            'Phòng bảo trì'
                                        )}
                                    </td>
                                    <td className="flex">
                                        <span
                                            onClick={() => setOneDataStudent(Room.count_student)}
                                            data-toggle="modal"
                                            data-target="#show-data"
                                        >
                                            <ShowIcon className={cx('icon-action')} />
                                        </span>
                                        <Link to={`/room/editRoom/${Room._id}`}>
                                            <span>
                                                <EditIcon className={cx('icon-action')} />
                                            </span>
                                        </Link>
                                        {Room.count_student.length === 0 && (
                                            <span
                                                data-toggle="modal"
                                                data-target="#open-modal"
                                                onClick={() => setDeleteId(Room._id)}
                                            >
                                                <TrashIcon className={cx('icon-action')} />
                                            </span>
                                        )}
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

            {dataRoom.length !== 0 && (
                <div className={cx('page')}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button className={cx('btn-page')} key={index} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}

            <DeleteData deleteData={deleteData} />

            <div className={cx('show-modal')}>
                <Modal id="show-data" fade>
                    <Modal.Dialog centered sm>
                        <Modal.Content>
                            <Modal.Header>
                                <Modal.Title>
                                    <span className="text-2xl">Thông tin chi tiết</span>
                                </Modal.Title>
                                <Modal.Close>
                                    <span className={cx('btn-close')} aria-hidden="true">
                                        &times;
                                    </span>
                                </Modal.Close>
                            </Modal.Header>
                            <Modal.Body>
                                {oneDataStudent.length > 0 ? (
                                    oneDataStudent.map((data) => (
                                        <div key={data.student_id._id} className={cx('modal-info')}>
                                            <img
                                                className={cx('avatar')}
                                                src={data.student_id.avatarUrl}
                                                alt={data.student_id.fullName}
                                            />
                                            {data.student_id.fullName}
                                        </div>
                                    ))
                                ) : (
                                    <div className={cx('modal-info')}>Chưa có ai trong phòng</div>
                                )}
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
