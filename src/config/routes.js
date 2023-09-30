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

  // admin
  home: "/home",
  Login: "/login",
  ManagerBill: "/managerBill",
  ManagerContract: "/managerContract",
  ManagerReport: "/managerReport",
};

export default routes;
