// move router

const routes = {
  // student
  ClientStudent: "/",
  Room: "/room",
  Contract: "/contract",
  Reports: "/reports",

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

  // admin
  home: "/home",
  Login: "/login",
  ManagerBill: "/managerBill",
  ManagerService: "/managerService",
  ManagerContract: "/managerContract",
  ManagerReport: "/managerReport",
};

export default routes;
