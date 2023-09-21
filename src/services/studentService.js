import { httpRequest } from "~/utils/httprequest";

const token = window.localStorage.token;
export const getStudents = async () => {
  try {
    const res = await httpRequest.get("student-manager/get-students", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postStudent = async (data) => {
  try {
    const res = await httpRequest.post("auth/create-user", data, {
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
    });
    return res.data
  } catch (error) {
    console.log(error);
  }
};
