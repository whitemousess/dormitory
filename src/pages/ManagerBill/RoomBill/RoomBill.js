import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import DeleteData from '~/components/DeleteData';
import styles from './RoomBill.module.scss';
import * as billRoomService from '~/services/billRoomService';
import { TrashIcon } from '~/components/Icons';
const cx = classNames.bind(styles);

function RoomBill() {
    const [dataRoom, setDataRoom] = useState([]);
    const [deleteId, setDeleteId] = useState('');

    function deleteData() {
        billRoomService
            .deleteBill({id: deleteId})
            .then(window.location.reload())
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        billRoomService
            .getAllBill({ status: '' })
            .then((bill) => {
                setDataRoom(bill);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Danh sách Phòng</span>

            <table className={cx('table')}>
                <tbody>
                    <tr>
                        <th>STT</th>
                        <th>Tên phòng</th>
                        <th>Giá phòng(VND)</th>
                        <th>Khu</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>

                    {dataRoom.length > 0 ? (
                        dataRoom.map((Room, index) => {
                            return (
                                <tr key={Room._id}>
                                    <td>{index + 1}</td>
                                    <td>{Room.room_id.room_name}</td>
                                    <td>{Room.room_id.price}</td>
                                    <td>{Room.room_id.area === 0 ? 'Nam' : 'Nữ'}</td>
                                    <td>
                                        {Room.status === 0 ? (
                                            <span className={cx('status-error')}>Chưa thanh toán</span>
                                        ) : (
                                            <span className={cx('status')}>Đã thanh toán</span>
                                        )}
                                    </td>
                                    <td className="flex">
                                        {Room.status === 1 && (
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

            <DeleteData deleteData={deleteData} />
        </div>
    );
}

export default RoomBill;
