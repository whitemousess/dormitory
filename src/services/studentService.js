import { httpRequest } from "~/utils/httprequest";

const token = window.localStorage.token;
export const getStudents = async () => {
  try {
    const res = await httpRequest.get("student-manager/get-students", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};