import { httpRequest } from "~/utils/httprequest";

const token = window.localStorage.token;

export const login = async (data) => {
  try {
    const res = await httpRequest.post("auth/login", data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async () => {
  try {
    const res = await httpRequest.get("auth/get-current", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return res.data.data;
  } catch (error) {
    if (error) {
      window.localStorage.removeItem("token");
      window.location = "/";
    }
  }
};

export const getAllUsers = async () => {
  try {
    const res = await httpRequest.get("auth/get-all-user", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const postUser = async (data) => {
  try {
    const res = await httpRequest.post("auth/create-user", data, {
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const userDelete = async ({ deleteID }) => {
  try {
    const res = await httpRequest.delete(`auth/${deleteID}/delete-user`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserId = async (studentId) => {
  try {
    const res = await httpRequest.get(`auth/${studentId}/get-current`, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const putUser = async ({ data, studentId }) => {
  try {
    const res = await httpRequest.put(`auth/${studentId}/edit`, data, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
