import classNames from 'classnames/bind';
import { useState } from 'react';

import routes from '~/config/routes';
import * as userService from '~/services/userService';
import styles from './AddUser.module.scss';
import { SentIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function AddUser() {
    const [data, setData] = useState('');
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', selectedFile);
        formData.append('username', data.username);
        formData.append('password', data.password);
        formData.append('email', data.email);
        formData.append('fullName', data.fullName);
        formData.append('address', data.address);
        formData.append('dob', data.dob);
        formData.append('phone', data.phone);
        formData.append('gender', data.gender);
        formData.append('role', '0');
        try {
            const res = await userService.postUser(formData);
            if (res.error) {
                setError('Tài khoản đã tồn tại !');
                window.location = '#';
            } else {
                window.location = routes.ManagerUser;
            }
        } catch (error) {
            console.log(error);
        }
    };

    function handle(e) {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);
    }

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Thêm người quản lý</span>
            <div className={cx('content')}>
                <div className={cx('content-left')}></div>
                <form onSubmit={(e) => submit(e)} className={cx('content-right')}>
                    <div className={cx('form-input')}>
                        <label>Tài khoản</label>
                        {error && <div className={cx('error')}>{error}</div>}
                        <input
                            className={cx('text-input')}
                            name="username"
                            value={data.username || ''}
                            onChange={(e) => handle(e)}
                            placeholder="Tài khoản ..."
                            required
                        />
                    </div>
                    <div className={cx('form-input')}>
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            className={cx('text-input')}
                            name="password"
                            value={data.password || ''}
                            onChange={(e) => handle(e)}
                            placeholder="Mật khẩu ..."
                            required
                        />
                    </div>
                    <div className={cx('form-input')}>
                        <label>Họ và tên</label>
                        <input
                            className={cx('text-input')}
                            name="fullName"
                            value={data.fullName || ''}
                            onChange={(e) => handle(e)}
                            placeholder="Họ và tên ..."
                            required
                        />
                    </div>
                    <div className={cx('form-input')}>
                        <label>Email</label>
                        <input
                            type="email"
                            className={cx('text-input')}
                            name="email"
                            value={data.email || ''}
                            onChange={(e) => handle(e)}
                            placeholder="Email ..."
                            required
                        />
                    </div>
                    <div className={cx('form-input')}>
                        <label>Giới tính</label>
                        <div>
                            <input
                                className={cx('radio-input')}
                                type="radio"
                                id="male"
                                name="gender"
                                onChange={(e) => handle(e)}
                                value={0}
                                required
                            />
                            <label htmlFor="male">Nam</label>
                            <input
                                className={cx('radio-input')}
                                type="radio"
                                id="female"
                                name="gender"
                                onChange={(e) => handle(e)}
                                value={1}
                                required
                            />
                            <label htmlFor="female">Nữ</label>
                        </div>
                    </div>
                    <div className={cx('form-input')}>
                        <label>Ngày sinh</label>
                        <input
                            className={cx('text-input')}
                            type="date"
                            name="dob"
                            value={data.dob || ''}
                            onChange={(e) => handle(e)}
                            required
                        />
                    </div>
                    <div className={cx('form-input')}>
                        <label>Địa chỉ</label>
                        <textarea
                            placeholder="Nhập địa chỉ ..."
                            className={cx('text-input')}
                            name="address"
                            value={data.address || ''}
                            onChange={(e) => handle(e)}
                            required
                        />
                    </div>
                    <div className={cx('form-input')}>
                        <label>Số điện thoại</label>
                        <input
                            className={cx('text-input')}
                            name="phone"
                            value={data.phone || ''}
                            onChange={(e) => handle(e)}
                            placeholder="Nhập số điện thoại ..."
                            required
                        />
                    </div>
                    <div className={cx('from-input')}>
                        <input type="file" name="avatar" onChange={handleFileChange} />
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

export default AddUser;
