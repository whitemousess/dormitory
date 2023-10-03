import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './HeaderInfo.module.scss';

const cx = classNames.bind(styles);

function HeaderInfo({titleButton,to,data}) {
    return (
        <div className={cx('wrapper')}>
            <strong className={cx('title')}>Thông tin cá nhân</strong>
            <div className={cx('body_header')}>
                <span>
                    <img
                        className={cx('avatar')}
                        src={data.avatarUrl}
                        alt={data.fullName}
                    />
                    <strong className={cx('full-name')}>{data.fullName}</strong>
                </span>

                <span>
                    <Link to={to}>
                        <button className={cx('btn-edit')}>
                            <strong>{titleButton}</strong>
                        </button>
                    </Link>
                </span>
            </div>
        </div>
    );
}

export default HeaderInfo;
