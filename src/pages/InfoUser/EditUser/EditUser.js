import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './EditUser.module.scss';
import HeaderInfo from '~/pages/InfoUser/HeaderInfo';
import Header from '~/layouts/components/Header';
import routes from '~/config/routes';
import * as userService from '~/services/userService';
import EditItem from './EditItem';

const cx = classNames.bind(styles);

function EditUser() {
    const [dataUser, setDataUser] = useState({});

    useEffect(() => {
        userService.getUser().then((user) => setDataUser(user));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={routes.ClientStudent}>
                    <div className={cx('title')}>University</div>
                </Link>
                <Header />
            </div>

            <div className={cx('container')}>
                <HeaderInfo data={dataUser} titleButton={'Trở về'} to={routes.UserInfo} />

                <EditItem data={dataUser}/>
            </div>
        </div>
    );
}

export default EditUser;
