import classNames from 'classnames/bind';
import { NavLink, useHistory } from 'react-router-dom';

import {
    LogoHome,
    LogoHomeActive,
    LogoStudent,
    LogoContract,
    LogoBill,
    LogoService,
    LogoRoom,
    LogoReport,
    LogoUser,
} from '~/components/Icons';
import styles from './Menu.module.scss';
import routes from '~/config/routes';
import { Collapse } from 'bootstrap-4-react/lib/components';

const cx = classNames.bind(styles);

function Menu() {
    return (
        <div className={cx('container')}>
            <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.home}>
                <span className={cx('active-icon')}>
                    <LogoHomeActive />
                </span>
                <span className={cx('icon')}>
                    <LogoHome />
                </span>
                <span className={cx('title')}>Trang chủ</span>
            </NavLink>

            <div id="accordionExample">
                <Collapse.Button className={cx('menu-item')} target="#manager-student">
                    <span className={cx('icon')}>
                        <LogoStudent />
                    </span>
                    <span className={cx('title')}>Quản lý sinh viên</span>
                </Collapse.Button>
                <Collapse id="manager-student" className={cx('collapse-item')} data-parent="#accordionExample">
                    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.ManagerStudent}>
                        <span className={cx('collapse-title')}>Danh sách sinh viên</span>
                    </NavLink>

                    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.addStudent}>
                        <span className={cx('collapse-title')}>Thêm sinh viên</span>
                    </NavLink>
                </Collapse>

                {/* Bill */}
                <Collapse.Button className={cx('menu-item')} target="#manager-bill">
                    <span className={cx('icon')}>
                        <LogoBill />
                    </span>
                    <span className={cx('title')}>Quản lý hóa đơn</span>
                </Collapse.Button>
                <Collapse id="manager-bill" className={cx('collapse-item')} data-parent="#accordionExample">
                    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.BillElectric}>
                        <span className={cx('collapse-title')}>Hóa đơn tiền điện</span>
                    </NavLink>

                    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.addStudent}>
                        <span className={cx('collapse-title')}>Thêm hóa đơn tiền điện</span>
                    </NavLink>

                    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.BillService}>
                        <span className={cx('collapse-title')}>Hóa đơn dịch vụ</span>
                    </NavLink>
                </Collapse>

                {/* Contract */}
                <Collapse.Button className={cx('menu-item')} target="#manager-contract">
                    <span className={cx('icon')}>
                        <LogoContract />
                    </span>
                    <span className={cx('title')}>Quản lý hợp đồng</span>
                </Collapse.Button>
                <Collapse id="manager-contract" className={cx('collapse-item')} data-parent="#accordionExample">
                    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.ManagerContract}>
                        <span className={cx('collapse-title')}>Danh sách hợp đồng</span>
                    </NavLink>

                    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.AddRoom}>
                        <span className={cx('collapse-title')}>Thêm hợp đồng</span>
                    </NavLink>
                </Collapse>

                {/* Service */}
                <Collapse.Button className={cx('menu-item')} target="#manager-service">
                    <span className={cx('icon')}>
                        <LogoService />
                    </span>
                    <span className={cx('title')}>Quản lý dịch vụ</span>
                </Collapse.Button>
                <Collapse id="manager-service" className={cx('collapse-item')} data-parent="#accordionExample">
                    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.ManagerService}>
                        <span className={cx('collapse-title')}>Danh sách dịch vụ</span>
                    </NavLink>

                    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.AddService}>
                        <span className={cx('collapse-title')}>Thêm dịch vụ</span>
                    </NavLink>
                </Collapse>

                {/* Room */}
                <Collapse.Button className={cx('menu-item')} target="#manager-room">
                    <span className={cx('icon')}>
                        <LogoRoom />
                    </span>
                    <span className={cx('title')}>Quản lý phòng</span>
                </Collapse.Button>
                <Collapse id="manager-room" className={cx('collapse-item')} data-parent="#accordionExample">
                    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.ManagerRoom}>
                        <span className={cx('collapse-title')}>Danh sách phòng</span>
                    </NavLink>

                    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.AddRoom}>
                        <span className={cx('collapse-title')}>Thêm phòng</span>
                    </NavLink>
                </Collapse>

                {/* User */}
                <Collapse.Button className={cx('menu-item')} target="#manager-user">
                    <span className={cx('icon')}>
                        <LogoUser />
                    </span>
                    <span className={cx('title')}>Quản lý người dùng</span>
                </Collapse.Button>
                <Collapse id="manager-user" className={cx('collapse-item')} data-parent="#accordionExample">
                    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.ManagerUser}>
                        <span className={cx('collapse-title')}>Danh sách quản lý</span>
                    </NavLink>

                    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.AddUser}>
                        <span className={cx('collapse-title')}>Thêm quản lý</span>
                    </NavLink>
                </Collapse>

                {/* Report */}
                <Collapse.Button className={cx('menu-item')} target="#manager-report">
                    <span className={cx('icon')}>
                        <LogoReport />
                    </span>
                    <span className={cx('title')}>Báo cáo</span>
                </Collapse.Button>
                <Collapse id="manager-report" className={cx('collapse-item')} data-parent="#accordionExample">
                    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={routes.ManagerReport}>
                        <span className={cx('collapse-title')}>Danh sách báo cáo</span>
                    </NavLink>
                </Collapse>
            </div>
        </div>
    );
}

export default Menu;
