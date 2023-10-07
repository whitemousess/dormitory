import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import * as userService from '~/services/userService';
import styles from './EditItem.module.scss';
import routes from '~/config/routes';
import { Button } from 'bootstrap-4-react';

const cx = classNames.bind(styles);

function EditItem() {
    const [dataUser, setDataUser] = useState('');
    const [selectedFile, setSelectedFile] = useState({});

    useEffect(() => {
        userService.getUser().then((user) => {
            setDataUser(user);
        });
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullName', dataUser.fullName);
        formData.append('password', dataUser.password);
        formData.append('address', dataUser.address);
        formData.append('dob', dataUser.dob);
        formData.append('email', dataUser.email);
        formData.append('phone', dataUser.phone);
        formData.append('gender', dataUser.gender);
        formData.append('avatar', selectedFile);

        try {
            await userService.putCurrentUser(formData);
            window.location = routes.UserInfo;
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handle = (e) => {
        const newData = { ...dataUser };
        newData[e.target.name] = e.target.value;
        setDataUser(newData);
    };

    const handleGender = (e, genderValue) => {
        const newData = { ...dataUser };
        newData[e.target.name] = genderValue;
        setDataUser(newData);
    };

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={(e) => submit(e)}>
                <span className={cx('title')}>Sửa tin</span>
                <div className={cx('box')}>
                    <label className={cx('label')}>Tên tài khoản : </label>
                    <label>{dataUser.username}</label>
                </div>
                <div className={cx('box')}>
                    <label className={cx('label')}>Họ và tên : </label>
                    <input
                        className={cx('text-input')}
                        name="fullName"
                        placeholder="Họ và tên ..."
                        value={dataUser.fullName || ''}
                        onChange={(e) => handle(e)}
                        required
                    />
                </div>
                <div className={cx('box')}>
                    <label className={cx('label')}>Mật khẩu : </label>
                    <input
                        className={cx('text-input')}
                        type="password"
                        name="password"
                        placeholder="Họ và tên ..."
                        value={dataUser.password || ''}
                        onChange={(e) => handle(e)}
                        required
                    />
                </div>
                <div className={cx('box')}>
                    <label className={cx('label')}>Giới tính : </label>
                    <div className={cx('gender')}>
                        <input
                            className={cx('radio-input')}
                            type="radio"
                            id="male"
                            name="gender"
                            value={0}
                            onChange={(e) => handleGender(e, 0)}
                            checked={dataUser.gender === 0}
                            required
                        />
                        <label htmlFor="male">Nam</label>
                        <input
                            className={cx('radio-input')}
                            type="radio"
                            id="female"
                            name="gender"
                            value={1}
                            onChange={(e) => handleGender(e, 1)}
                            checked={dataUser.gender === 1}
                            required
                        />
                        <label htmlFor="female">Nữ</label>
                    </div>
                </div>
                <div className={cx('box')}>
                    <label className={cx('label')}>Ngày sinh : </label>
                    <input
                        className={cx('text-input')}
                        type="date"
                        name="dob"
                        value={dataUser.dob || ''}
                        onChange={(e) => handle(e)}
                        required
                    />
                </div>
                <div className={cx('box')}>
                    <label className={cx('label')}>Địa chỉ : </label>
                    <textarea
                        placeholder="Nhập địa chỉ ..."
                        className={cx('text-input')}
                        name="address"
                        value={dataUser.address || ''}
                        onChange={(e) => handle(e)}
                        required
                    />
                </div>
                <div className={cx('box')}>
                    <label className={cx('label')}>Email : </label>
                    <input
                        className={cx('text-input')}
                        name="email"
                        value={dataUser.email || ''}
                        onChange={(e) => handle(e)}
                        required
                    />
                </div>
                <div className={cx('box')}>
                    <label className={cx('label')}>Số điện thoại : </label>
                    <input
                        className={cx('text-input')}
                        name="phone"
                        value={dataUser.phone || ''}
                        onChange={(e) => handle(e)}
                        placeholder="Nhập số điện thoại ..."
                        required
                    />
                </div>

                <div className={cx('box')}>
                    <label className={cx('label')}>Ảnh đại diện : </label>

                    <input type="file" name="avatar" onChange={handleFileChange} />
                </div>

                <Button primary className={cx("btn-edit")}>Sửa</Button>
            </form>
        </div>
    );
}

export default EditItem;
