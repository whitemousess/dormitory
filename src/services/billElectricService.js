import { httpRequest } from '~/utils/httprequest';

const token = localStorage.token;

export const getAllElectric = async () => {
    try {
        const res = await httpRequest.get(`bill-electric-water/get-all-electric`, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getElectricRoom = async () => {
    try {
        const res = await httpRequest.get(`bill-electric/get-electric-room`, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getOneElectric = async ({ room_id, bill_id }) => {
    try {
        const res = await httpRequest.get(`bill-electric-water/get-one-electric`, {
            headers: { authorization: 'Bearer ' + token },
            params: { room_id, bill_id },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const createElectric = async ({ room_id, data }) => {
    try {
        const res = await httpRequest.put(`bill-electric-water/${room_id}/create-bill`, data, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteElectric = async ({ room_id, bill_id }) => {
    try {
        const res = await httpRequest.get(`bill-electric-water/delete-bill`, {
            headers: { authorization: 'Bearer ' + token },
            params: { room_id, bill_id },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const editElectric = async ({ room_id, bill_id, data }) => {
    try {
        const res = await httpRequest.put(`bill-electric-water/edit-bill`, data, {
            headers: { authorization: 'Bearer ' + token },
            params: { room_id, bill_id },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};
