import classNames from "classnames/bind";

import styles from "./SideBar.module.scss";
import routes from "~/config/routes";
import Menu, { MenuItem } from "./Menu";
import {
  LogoHome,
  LogoHomeActive,
  LogoStudent,
  LogoStudentActive,
  LogoContract,
  LogoContractActive,
  LogoBill,
  LogoBillActive,
  LogoService,
  LogoServiceActive,
  LogoRoom,
  LogoRoomActive,
  LogoReport,
  LogoReportActive,
  LogoUser,
  LogoUserActive,
} from "~/components/Icons";

const cx = classNames.bind(styles);

function SideBar() {
  const MenuItems = [
    {
      id: 1,
      title: "Trang chủ",
      to: routes.home,
      icon: <LogoHome />,
      activeIcon: <LogoHomeActive />,
    },
    {
      id: 2,
      title: "Quản lý sinh viên",
      to: routes.ManagerStudent,
      icon: <LogoStudent />,
      activeIcon: <LogoStudentActive />,
    },
    {
      id: 3,
      title: "Quản lý hóa đơn",
      to: routes.ManagerBill,
      icon: <LogoBill />,
      activeIcon: <LogoBillActive />,
    },
    {
      id: 4,
      title: "Quản lý hợp đồng",
      to: routes.ManagerContract,
      icon: <LogoContract />,
      activeIcon: <LogoContractActive />,
    },
    {
      id: 5,
      title: "Quản lý dịch vụ",
      to: routes.ManagerService,
      icon: <LogoService />,
      activeIcon: <LogoServiceActive />,
    },
    {
      id: 6,
      title: "Quản lý phòng",
      to: routes.ManagerRoom,
      icon: <LogoRoom />,
      activeIcon: <LogoRoomActive />,
    },
    {
      id: 8,
      title: "Quản lý người dùng",
      to: routes.ManagerUser,
      icon: <LogoUser />,
      activeIcon: <LogoUserActive />,
    },
    {
      id: 7,
      title: "Báo cáo",
      to: routes.ManagerReport,
      icon: <LogoReport />,
      activeIcon: <LogoReportActive />,
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>University</div>

      <Menu>
        {MenuItems.map((item) => (
          <MenuItem
            key={item.id}
            title={item.title}
            to={item.to}
            icon={item.icon}
            activeIcon={item.activeIcon}
          />
        ))}
      </Menu>
    </div>
  );
}

export default SideBar;
