import { httpRequest } from "~/utils/httprequest";

const token = window.localStorage.token;
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

export const postUser = async (data) => {
  try {
    const res = await httpRequest.post("auth/login", data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data
  } catch (error) {
    console.error(error);
  }
};
