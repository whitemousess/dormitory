// move router

const routes = {
    // student
    ClientStudent: '/',
    Room: '/room',
    Contract: '/contract',
    Reports: '/reports',
    Service: '/Service',
    Payment: '/Payment',

    // manager
    // //student
    ManagerStudent: '/student/managerStudent',
    editStudent: '/student/editStudent/:id',
    addStudent: '/student/addStudent',

    // // User
    ManagerUser: '/use/managerUser',
    AddUser: '/use/addUser',

    // // Room
    ManagerRoom: '/room/managerRoom',
    AddRoom: '/room/addRoom',
    EditRoom: '/room/editRoom/:id',

    // // Services
    ManagerService: '/service/managerService',
    AddService: '/service/addService',
    EditService: '/service/editService/:id',

    // // Bill Service and Bill electric
    BillElectric: '/bill/billElectric',
    BillService: '/bill/billService',
    BillRoom: '/bill/billRoom',
    AddElectricity: '/bill/addElectricity',
    EditElectricity: '/bill/editElectricity',

    // // contract
    ManagerContract: '/contract/managerContract',
    Liquidation: '/contract/liquidation',
    AddContract: '/contract/addContract',

    // // Report
    ManagerReport: '/report/managerReport',

    // USER INFO
    UserInfo: '/info/userInfo',
    EditInfo: '/info/editInfo',

    // admin
    home: '/home',
    Login: '/login',
};

export default routes;
