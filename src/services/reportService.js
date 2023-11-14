import { httpRequest } from '~/utils/httprequest';

const token = localStorage.token;
export const sentReport = async (data) => {
    try {
        const res = await httpRequest.put('report/create-report', data, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllReports = async () => {
    try {
        const res = await httpRequest.get('report/get-all-report', {
            headers: { authorization: 'Bearer ' + token },
        });

        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getReportUser = async () => {
    try {
        const res = await httpRequest.get('report/get-student-report', {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const success = async ({ id }) => {
    try {
        const res = await httpRequest.get(`report/${id}/success-report`, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteReport = async (id) => {
    try {
        const res = await httpRequest.get(`report/${id}/delete-report`, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};
