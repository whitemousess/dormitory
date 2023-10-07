import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap-4-react';
import { Modal } from 'bootstrap-4-react/lib/components';

import DeleteData from '~/components/DeleteData';
import styles from './RoomManager.module.scss';
import * as roomService from '~/services/roomService';
import { EditIcon, ShowIcon, TrashIcon } from '~/components/Icons';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function RoomManager() {
    const [dataRoom, setDataRoom] = useState([]);
    const [deleteId, setDeleteId] = useState('');
    const [oneDataStudent, setOneDataStudent] = useState('');
    const [dataSearch, setDataSearch] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const params = new URLSearchParams(window.location.search);
    const endURL = window.location.href;
    const page = params.get('page');
    const search = params.get('search');

    const handleSearch = (e) => {
        setDataSearch(e.target.value);
    };

    const handlePageChange = (pageNumber) => {
        if (!search) {
            window.location = `${routes.ManagerRoom}?page=${pageNumber}`;
        } else {
            window.location = `${endURL}&page=${pageNumber}`;
        }
    };

    const submitSearch = (search) => {
        if (!page) {
            window.location = `${routes.ManagerRoom}?search=${search}`;
        } else if (search) {
            window.location = `${endURL}&search=${search}`;
        }
    };

    function deleteData(e) {
        e.preventDefault();
        roomService
            .deleteRoom(deleteId)
            .then(() => window.location.reload())
            .catch((error) => console.log(error));
    }

    const studentInRoom = (id) => {
        roomService.getStudentInRoom({ room_id: id }).then((roomData) => setOneDataStudent(roomData));
    };

    useEffect(() => {
        roomService.getRoomManager({ page: page, perPage: 10, q: search }).then((Room) => {
            setDataRoom((preV) => [...preV, ...Room.data]);
            setTotalPages(Room.totalPages);
        });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Danh sách Phòng</span>

            <div className={cx('action')}>
                <input
                    type="text"
                    value={dataSearch}
                    onChange={(e) => handleSearch(e)}
                    className={cx('search-input')}
                    placeholder="Tìm kiếm tên phòng"
                />
                <Button primary onClick={() => submitSearch(dataSearch)} className={cx('btn-search')}>
                    Tìm kiếm
                </Button>
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
                                    <td>{Room.user_id ? Room.user_id.fullName : 'Chưa có người quản lý'}</td>
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
                                            onClick={() => studentInRoom(Room._id)}
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
                                <Modal.Title>Thông tin chi tiết</Modal.Title>
                                <Modal.Close>
                                    <span className={cx('btn-close')} aria-hidden="true">
                                        &times;
                                    </span>
                                </Modal.Close>
                            </Modal.Header>
                            <Modal.Body>
                                {oneDataStudent.length > 0 ? (
                                    oneDataStudent.map((data) => (
                                        <div key={data._id} className={cx('modal-info')}>
                                            <img className={cx('avatar')} src={data.masv.avatarUrl} alt="" />
                                            {data.masv.fullName}
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
