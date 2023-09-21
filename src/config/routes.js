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
  addStudent: "/addStudent",
  editStudent: "/editStudent/:id",

  // admin
  home: "/home",
  Login: "/login",
  ManagerBill: "/managerBill",
  ManagerRoom: "/managerRoom",
  ManagerService: "/managerService",
  ManagerUser: "/managerUser",
  ManagerContract: "/managerContract",
  ManagerReport: "/managerReport",
};

export default routes;
