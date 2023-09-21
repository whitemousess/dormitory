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

export const getStudentId = async (studentId) => {
  try {
    const res = await httpRequest.get(
      `student-manager/get-one-student/${studentId}`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
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
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const studentDelete = async ({ deleteID }) => {
  try {
    const res = await httpRequest.delete(`student-manager/${deleteID}/delete`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const putStudent = async ({ data, studentId }) => {
  try {
    const res = await httpRequest.put(
      `student-manager/${studentId}/edit`,
      data,
      { headers: { authorization: "Bearer " + token } }
    );
      return res.data;
  } catch (error) {
    console.log(error);
  }
};
