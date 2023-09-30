// routeConfig
import config from "~/config";

import { ClientUser } from "~/layouts";

// Router change Pages
import { ClientStudent, Contract, Reports, Room ,UseService} from "~/pages/Client";

import Home from "~/pages/Home";
import Login from "~/pages/Login";
// manager student
import {
  ManagerStudents,
  EditStudent,
  AddStudent,
} from "~/pages/ManagerStudent";
// manager Room
import { RoomManager, AddRoom, EditRoom } from "~/pages/ManagerRoom";
// manager User
import { User, AddUser } from "~/pages/ManagerUser";
// manager Services
import { Service ,AddService,EditService} from "~/pages/ManagerService"

import ManagerBill from "~/pages/ManagerBill";
import ManagerContract from "~/pages/ManagerContract";
import ManagerReport from "~/pages/ManagerReport";

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

  { path: config.routes.ManagerBill, component: ManagerBill },
  { path: config.routes.ManagerContract, component: ManagerContract },
  { path: config.routes.ManagerReport, component: ManagerReport },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
