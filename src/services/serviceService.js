import { httpRequest } from '~/utils/httprequest';

const token = localStorage.token;
export const getService = async () => {
    try {
        const res = await httpRequest.get('services/get-all-service', {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getServiceId = async (id) => {
    try {
        const res = await httpRequest.get(`services/${id}/get-service`, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteData = async (id) => {
    try {
        const res = await httpRequest.delete(`services/${id}/delete`, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const createService = async (data) => {
    try {
        const res = await httpRequest.post(`services/create-service`, data, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const editService = async ({data, id}) => {
    try {
        const res = await httpRequest.put(`services/${id}/edit`, data, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};
