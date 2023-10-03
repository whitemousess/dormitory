// move router

const routes = {
  // student
  ClientStudent: "/",
  Room: "/room",
  Contract: "/contract",
  Reports: "/reports",
  Service: "/Service",
  Payment: "/Payment",

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
  AddElectricity: "/addElectricity",
  EditElectricity: "/editElectricity/:id",

  // // contract
  ManagerContract: "/managerContract",
  Liquidation: "/liquidation",
  AddContract: "/addContract",

  // // Report
  ManagerReport: "/managerReport",

  // USER INFO
  UserInfo: "/userInfo",  
  EditInfo: "/editInfo",  

  // admin
  home: "/home",
  Login: "/login",

};

export default routes;
