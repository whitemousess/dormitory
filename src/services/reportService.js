import { httpRequest } from '~/utils/httprequest';

const token = localStorage.token;
export const sentReport = async (data) => {
    try {
        const res = await httpRequest.post('report/create-report', data, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllReports = async () => {
    try {
        const res = await httpRequest.get('report/get-report', {
            headers: { authorization: 'Bearer ' + token },
        });

        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const success = async (id) => {
    try {
        const data = 1;
        const res = await httpRequest.put(`report/${id}/success-report`, data, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteReport = async (id) => {
    try {
        const res = await httpRequest.delete(`report/${id}/delete-report`, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};
