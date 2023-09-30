import { useEffect } from 'react';
import classNames from 'classnames/bind';

import Navigate from './Navigate';
import styles from './ClientUser.module.scss';
import Header from '~/layouts/components/Header';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function ClientUser({ children }) {
    useEffect(() => {
        const token = localStorage.token;
        if (!token) {
            window.location = routes.Login;
        }
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('title')}>University</div>

                <Navigate />

                <Header />
            </div>
            <div className={cx('content')}>{children}</div>
            <div className={cx('footer')}>2023 © Quản lý ký túc xá</div>
        </div>
    );
}

export default ClientUser;
