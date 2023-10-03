import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Items from './Items';
import routes from '~/config/routes';
import styles from './InfoUser.module.scss';
import Header from '~/layouts/components/Header';
import HeaderInfo from '~/pages/InfoUser/HeaderInfo';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function InfoUser() {
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
                <HeaderInfo data={dataUser} titleButton={'Sửa'} to={routes.EditInfo} />

                <Items data={dataUser}/>
            </div>
        </div>
    );
}

export default InfoUser;
