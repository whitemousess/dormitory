import { httpRequest } from '~/utils/httprequest';

const token = localStorage.token;

export const getRequestServiceAdmin = async () => {
    try {
        const res = await httpRequest.get('bill-service/admin/get-service-request', {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getServiceUser = async () => {
    try {
        const res = await httpRequest.get('bill-service/user/get-service-request', {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const requestService = async ({ data }) => {
    try {
        const res = await httpRequest.put('bill-service/request-bill', data, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteRequestService = async ({ room_id, service_id }) => {
    try {
        const res = await httpRequest.get(`bill-service/delete-bill`, {
            headers: { authorization: 'Bearer ' + token },
            params: { room_id, service_id },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const successService = async ({ roomId }) => {
    try {
        const res = await httpRequest.get(`bill-service/success-bill`, {
            headers: { authorization: 'Bearer ' + token },
            params: { room_id: roomId },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
