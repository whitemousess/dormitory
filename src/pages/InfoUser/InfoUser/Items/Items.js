import classNames from 'classnames/bind';

import styles from './Items.module.scss';

const cx = classNames.bind(styles);

function Items({ data }) {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Thông tin</span>
            <div className={cx('box')}>
                <label className={cx('label')}>Họ và tên : </label>
                <label>{data.fullName}</label>
            </div>
            <div className={cx('box')}>
                <label className={cx('label')}>Tên tài khoản : </label>
                <label>{data.username}</label>
            </div>
            <div className={cx('box')}>
                <label className={cx('label')}>Giới tính : </label>
                <label>{data.gender === 0 ? "Nam" : "Nữ"}</label>
            </div>
            <div className={cx('box')}>
                <label className={cx('label')}>Ngày sinh : </label>
                <label>{data.dob}</label>
            </div>
            <div className={cx('box')}>
                <label className={cx('label')}>Địa chỉ : </label>
                <label>{data.address}</label>
            </div>
            <div className={cx('box')}>
                <label className={cx('label')}>Email : </label>
                <label>{data.email}</label>
            </div>
            <div className={cx('box')}>
                <label className={cx('label')}>Số điện thoại : </label>
                <label>{data.phone}</label>
            </div>
        </div>
    );
}

export default Items;
