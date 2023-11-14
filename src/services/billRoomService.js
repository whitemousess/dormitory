import { httpRequest } from '~/utils/httprequest';

const token = localStorage.token;
const headersToken = {
    headers: { authorization: 'Bearer ' + token },
};

export const getAllBill = async ({ status }) => {
    try {
        const res = await httpRequest.get('bill-room/get-all-bill', {
            headers: { authorization: 'Bearer ' + token },
            params: { status },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getOneBill = async () => {
    try {
        const res = await httpRequest.get('bill-room/get-bill', headersToken);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const createBillRoom = async ({ room_id }) => {
    try {
        const res = await httpRequest.post('bill-room/create-bill-room', { room_id }, headersToken);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteBill = async ({ id }) => {
    try {
        const res = await httpRequest.delete(`bill-room/${id}/delete-bill`, headersToken);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const painBill = async ({ roomId, data }) => {
    try {
        const res = await httpRequest.put(`bill-room/${roomId}/paid-bill`, data, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
