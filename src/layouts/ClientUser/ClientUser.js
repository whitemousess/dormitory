import { useEffect } from 'react';
import classNames from 'classnames/bind';

import Navigate from './Navigate';
import styles from './ClientUser.module.scss';
import Header from '~/layouts/components/Header';
import routes from '~/config/routes';
import * as userService from "~/services/userService";

const cx = classNames.bind(styles);

function ClientUser({ children }) {
    async function checkLogin() {
        const token = localStorage.token;
        const user = await userService.getUser();
        if (!token) {
            window.location = routes.Login;
        } else if (user.role === 0) {
            window.location = "/home";
        }
    }

    useEffect(() => {
        checkLogin();
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
