import { httpRequest } from '~/utils/httprequest';

const token = localStorage.token;

export const getRequestServiceAdmin = async () => {
    try {
        const res = await httpRequest.get('bills/admin/get-service-request', {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getServiceUser = async () => {
    try {
        const res = await httpRequest.get('bills/user/get-service-request', {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const requestService = async ({ data }) => {
    try {
        const res = await httpRequest.post('bills/request-bill', data, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};
