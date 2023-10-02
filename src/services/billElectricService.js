import { httpRequest } from '~/utils/httprequest';

const token = localStorage.token;

export const getAllElectric = async () => {
    try {
        const res = await httpRequest.get(`bill-electric/get-electric`, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getElectricRoom = async ({ room_id }) => {
    try {
        const res = await httpRequest.get(`bill-electric/get-electric-room/${room_id}`, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getOneElectric = async ({ id }) => {
    try {
        const res = await httpRequest.get(`bill-electric/${id}/get-one-electric`, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const createElectric = async ({ data }) => {
    try {
        const res = await httpRequest.post(`bill-electric/create-bill`, data, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteElectric = async ({ id }) => {
    try {
        const res = await httpRequest.delete(`bill-electric/${id}/delete-bill`, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const editElectric = async ({ id, data }) => {
    try {
        const res = await httpRequest.put(`bill-electric/${id}/edit-bill`, data, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};
