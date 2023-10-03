// routeConfig
import config from '~/config';

import { ClientUser } from '~/layouts';

// Router change Pages
import { ClientStudent, Contract, Reports, Room, UseService, Payment } from '~/pages/Client';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
// manager student
import { ManagerStudents, EditStudent, AddStudent } from '~/pages/ManagerStudent';
// manager Room
import { RoomManager, AddRoom, EditRoom } from '~/pages/ManagerRoom';
// manager User
import { User, AddUser } from '~/pages/ManagerUser';
// manager Services
import { Service, AddService, EditService } from '~/pages/ManagerService';

import { ElectricityBill, ServiceBill, AddElectricity, EditElectric } from '~/pages/ManagerBill';

import { Contracts, Liquidation, AddContract } from '~/pages/ManagerContract';

import { InfoUser, EditUser } from '~/pages/InfoUser';

import ManagerReport from '~/pages/ManagerReport';

const publicRoutes = [
    // user
    {
        path: config.routes.ClientStudent,
        component: ClientStudent,
        layout: ClientUser,
    },
    { path: config.routes.Room, component: Room, layout: ClientUser },
    { path: config.routes.Service, component: UseService, layout: ClientUser },
    { path: config.routes.Contract, component: Contract, layout: ClientUser },
    { path: config.routes.Reports, component: Reports, layout: ClientUser },
    { path: config.routes.Payment, component: Payment, layout: ClientUser },

    { path: config.routes.UserInfo, component: InfoUser, layout: null },
    { path: config.routes.EditInfo, component: EditUser, layout: null },

    //   admin
    { path: config.routes.home, component: Home },
    { path: config.routes.Login, component: Login, layout: null },

    { path: config.routes.ManagerStudent, component: ManagerStudents },
    { path: config.routes.addStudent, component: AddStudent },
    { path: config.routes.editStudent, component: EditStudent },

    { path: config.routes.ManagerUser, component: User },
    { path: config.routes.AddUser, component: AddUser },

    { path: config.routes.ManagerRoom, component: RoomManager },
    { path: config.routes.AddRoom, component: AddRoom },
    { path: config.routes.EditRoom, component: EditRoom },

    { path: config.routes.ManagerService, component: Service },
    { path: config.routes.AddService, component: AddService },
    { path: config.routes.EditService, component: EditService },

    { path: config.routes.BillElectric, component: ElectricityBill },
    { path: config.routes.BillService, component: ServiceBill },
    { path: config.routes.AddElectricity, component: AddElectricity },
    { path: config.routes.EditElectricity, component: EditElectric },

    { path: config.routes.ManagerContract, component: Contracts },
    { path: config.routes.AddContract, component: AddContract },
    { path: config.routes.Liquidation, component: Liquidation },

    { path: config.routes.ManagerReport, component: ManagerReport },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
