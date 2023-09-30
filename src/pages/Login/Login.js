import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Button } from 'bootstrap-4-react/lib/components';

import styles from './Login.module.scss';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Login() {
    const [data, setData] = useState('');
    const [error, setError] = useState('');

    function handleText(e) {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);
    }

    function submit(e) {
        e.preventDefault();
        userService
            .login(data)
            .then((data) => {
                const user = data;
                if (data.token) {
                    window.localStorage.setItem('token', user.token);
                    if (data.role === 1) {
                        window.location = '/';
                    } else {
                        window.location = '/home';
                    }
                }
            })
            .catch((err) => {
                setError(err);
            });
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            submit(e); // Gọi hàm handleSubmit khi người dùng nhấn phím "Enter"
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form onKeyDown={handleKeyPress} onSubmit={submit} className={cx('container')}>
                <header className={cx('header')}>Đăng nhập</header>
                {error && <div className={cx('error')}>Tài khoản hoặc mật khẩu không chính xác</div>}
                <p className={cx('title')}>Tài khoản</p>
                <div className={cx('form-group')}>
                    <input
                        type="text"
                        className={cx('input-login')}
                        placeholder="Tài khoản"
                        name="username"
                        value={data.username || ''}
                        onChange={(e) => handleText(e)}
                        required
                    />
                </div>
                <p className={cx('title')}>Mật khẩu</p>
                <div className={cx('form-group')}>
                    <input
                        type="password"
                        className={cx('input-login')}
                        placeholder="Password"
                        name="password"
                        value={data.password || ''}
                        onChange={(e) => handleText(e)}
                        required
                    />
                </div>
                <Button primary className={cx('btn-login')} onClick={submit}>
                    Đăng nhập
                </Button>
            </form>
        </div>
    );
}

export default Login;
