import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap-4-react/lib/components';

import routes from '~/config/routes';
import styles from './Header.module.scss';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Header() {
    const [userToken, setUserToken] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.token;
        if (token) {
            setUserToken(true);
            userService
                .getUser()
                .then((user) => {
                    setUser(user);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const MENU_ITEM = () => {
        return (
            <div className={cx('menu-item')}>
                <Link className={cx('menu-link')}>Thông tin cá nhân</Link>
                {user.role === 0 ? (
                    <Link className={cx('menu-link')} to={routes.home}>
                        Quản lý
                    </Link>
                ) : null}
                <Link className={cx('menu-link')} onClick={logout}>
                    Đăng xuất
                </Link>
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            {userToken ? (
                <Tippy
                    hideOnClick={true}
                    interactive
                    trigger={'click'}
                    render={MENU_ITEM}
                    popperOptions={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [-40, 0], // Điều chỉnh giá trị "-20px" để di chuyển sang trái
                                },
                            },
                        ],
                    }}
                >
                    <div className={cx('user')}>
                        <img className={cx('avatar')} src={user.avatarUrl} alt={user.fullName} />
                        <span className={cx('username')}>{user.fullName}</span>
                    </div>
                </Tippy>
            ) : (
                <div className={cx('user')}>
                    <Link to={routes.Login}>
                        <Button className={cx('btn-login')} primary>
                            Đăng nhập
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Header;
