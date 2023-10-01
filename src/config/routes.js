// move router

const routes = {
  // student
  ClientStudent: "/",
  Room: "/room",
  Contract: "/contract",
  Reports: "/reports",
  Service: "/Service",

  // manager
  // //student
  ManagerStudent: "/managerStudent",
  editStudent: "/editStudent/:id",
  addStudent: "/addStudent",

  // // User
  ManagerUser: "/managerUser",
  AddUser: "/addUser",

  // // Room
  ManagerRoom: "/managerRoom",
  AddRoom: "/addRoom",
  EditRoom: "/editRoom/:id",

  // // Services
  ManagerService: "/managerService",
  AddService: "/addService",
  EditService: "/editService/:id",

  // // Bill Service and Bill electric
  BillElectric: "/billElectric",
  BillService: "/billService",


  // admin
  home: "/home",
  Login: "/login",
  ManagerContract: "/managerContract",
  ManagerReport: "/managerReport",
};

export default routes;
