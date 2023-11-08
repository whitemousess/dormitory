import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'bootstrap-4-react/lib/components';

import { ShowIcon } from '~/components/Icons';
import * as userService from '~/services/userService';
import styles from './User.module.scss';

const cx = classNames.bind(styles);

function User() {
    const [dataUser, setDataUser] = useState([]);
    const [oneDataStudent, setOneDataStudent] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const params = new URLSearchParams(window.location.search);
    const endURL = window.location.href;
    const page = params.get('page');

    const handlePageChange = (pageNumber) => {
        window.location = `${endURL}?page=${pageNumber}`;
    };

    useEffect(() => {
        userService.getAllUsers({ page: page, perPage: 10 }).then((users) => {
            setDataUser((preData) => [...preData, ...users.data]);
            setTotalPages(users.totalPages);
        });
    }, [page]);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Danh sách Người dùng</span>

            <table className={cx('table')}>
                <tbody>
                    <tr>
                        <th>STT</th>
                        <th>Tên đăng nhập</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                    {dataUser.length !== 0 ? (
                        dataUser.map((data, index) => (
                            <tr key={data._id}>
                                <th>{index + 1}</th>
                                <td>{data.username}</td>
                                <td>{data.fullName}</td>
                                <td>
                                    <Link to={`mailto:${data.email}`}>{data.email || 'Chưa thêm email'}</Link>
                                </td>
                                <td>
                                    <Link to={`tel:${data.phone}`}>{data.phone || 'Chưa thêm liên hệ'}</Link>
                                </td>
                                <td>
                                    <span
                                        onClick={() => setOneDataStudent(data)}
                                        data-toggle="modal"
                                        data-target="#show-data"
                                    >
                                        <ShowIcon className={cx('icon-action')} />
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td style={{ textAlign: 'center' }} colSpan="5">
                                Chưa có thông tin nào !
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {dataUser.length !== 0 && (
                <div className={cx('page')}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button className={cx('btn-page')} key={index} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}

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
                                <div className={cx('modal-avatar')}>
                                    <img
                                        className={cx('avatar')}
                                        src={oneDataStudent.avatarUrl}
                                        alt={oneDataStudent.fullName}
                                    />
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Tài khoản: </strong> {oneDataStudent.username}
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Họ và tên: </strong> {oneDataStudent.fullName}
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Giới tính:</strong> {oneDataStudent.gender === 0 ? 'nam' : 'nữ'}
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Ngày sinh:</strong> {oneDataStudent.dob}
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Địa chỉ:</strong> {oneDataStudent.address || 'Chưa thêm địa chỉ'}
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Số điện thoại:</strong> {oneDataStudent.phone || 'Chưa thêm liên hệ'}
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Email:</strong> {oneDataStudent.email || 'Chưa thêm liên hệ'}
                                </div>
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

export default User;
