import { httpRequest } from "~/utils/httprequest";

const token = localStorage.token;

export const getRoomManager = async () => {
  try {
    const res = await httpRequest.get("rooms/get-manager-room", {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomManagerId = async (id) => {
  try {
    const res = await httpRequest.get(`rooms/${id}/get-room`, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createRoom = async (data) => {
  try {
    const res = await httpRequest.post("rooms/create-room", data, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRoom = async (deleteId) => {
  try {
    const res = await httpRequest.delete(`rooms/${deleteId}/delete-room`, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editRoom = async ({id, data}) => {
  try {
    const res = await httpRequest.put(`rooms/${id}/edit-room`, data, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
