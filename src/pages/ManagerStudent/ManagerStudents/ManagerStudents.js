import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Button, Modal } from 'bootstrap-4-react/lib/components';

import { EditIcon, ShowIcon, TrashIcon } from '~/components/Icons';
import * as studentService from '~/services/studentService';
import * as userService from '~/services/userService';
import styles from './ManagerStudents.module.scss';
import DeleteData from '~/components/DeleteData';

const cx = classNames.bind(styles);

function ManagerStudents() {
    const [dataStudents, setDataStudents] = useState([]);
    const [oneDataStudent, setOneDataStudent] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const params = new URLSearchParams(window.location.search);
    const endURL = window.location.href;
    const page = params.get('page');

    const handlePageChange = (pageNumber) => {
        window.location = `${endURL}&page=${pageNumber}`;
    };
    function deleteData(e) {
        e.preventDefault();
        userService
            .userDelete({ deleteID: deleteId })
            .then(window.location.reload())
            .catch((error) => console.log({ error: error }));
    }

    useEffect(() => {
        studentService.getStudents({ page: page, perPage: 10 }).then((students) => {
            setDataStudents((preData) => [...preData, ...students.data]);
            setTotalPages(students.totalPages);
        });
    }, [page]);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Danh sách sinh viên</span>

            <table className={cx('table')}>
                <tbody>
                    <tr>
                        <th>STT</th>
                        <th>Mã sinh viên</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                    {dataStudents.length !== 0 ? (
                        dataStudents.map((data, index) => (
                            <tr key={data._id}>
                                <th>{index + 1}</th>
                                <td>{data.user_id}</td>
                                <td>{data.fullName}</td>
                                <td>
                                    <Link to={`mailto:${data.email}`}>{data.email || 'Chưa thêm email'}</Link>
                                </td>
                                <td>
                                    <Link to={`tel:${data.phone}`}>{data.phone || 'Chưa thêm số điện thoại'}</Link>
                                </td>
                                <td className='flex'>
                                    <span
                                        onClick={() => setOneDataStudent(data)}
                                        data-toggle="modal"
                                        data-target="#show-data"
                                    >
                                        <ShowIcon className={cx('icon-action')} />
                                    </span>
                                    <Link to={`/student/editStudent/${data._id}`}>
                                        <span>
                                            <EditIcon className={cx('icon-action')} />
                                        </span>
                                    </Link>
                                    <span
                                        data-toggle="modal"
                                        data-target="#open-modal"
                                        onClick={() => setDeleteId(data._id)}
                                    >
                                        <TrashIcon className={cx('icon-action')} />
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
            {dataStudents.length !== 0 && (
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
                                <div className={cx('modal-avatar')}>
                                    <img
                                        className={cx('avatar')}
                                        src={oneDataStudent.avatarUrl}
                                        alt={oneDataStudent.fullName}
                                    />
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Mã sinh viên:</strong> {oneDataStudent.user_id}
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
                                    <strong>Địa chỉ:</strong> {oneDataStudent.address}
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Số điện thoại:</strong> {oneDataStudent.phone}
                                </div>
                                <div className={cx('modal-info')}>
                                    <strong>Email:</strong> {oneDataStudent.email}
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

export default ManagerStudents;
