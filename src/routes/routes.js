// routeConfig
import config from '~/config';

// Router change Pages
import Home from '~/pages/Home';
import ManagerStudent from '~/pages/ManagerStudent';
import ManagerBill from "~/pages/ManagerBill"
import ManagerRoom from "~/pages/ManagerRoom"
import ManagerService from "~/pages/ManagerService"
import ManagerUser from "~/pages/ManagerUser"
import ManagerContract from "~/pages/ManagerContract"
import ManagerReport from "~/pages/ManagerReport"

const publicRoutes = [
    { path: config.routes.home, component: Home},
    { path: config.routes.ManagerStudent, component: ManagerStudent},
    { path: config.routes.ManagerBill, component: ManagerBill },
    { path: config.routes.ManagerRoom, component: ManagerRoom },
    { path: config.routes.ManagerService, component: ManagerService },
    { path: config.routes.ManagerUser, component: ManagerUser },
    { path: config.routes.ManagerContract, component: ManagerContract },
    { path: config.routes.ManagerReport, component: ManagerReport },
]; 

const privateRoutes = []; 

export {publicRoutes ,privateRoutes};