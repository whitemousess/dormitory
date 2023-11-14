import { httpRequest } from '~/utils/httprequest';

const token = localStorage.token;

export const getContract = async () => {
    try {
        const res = await httpRequest.get(`contract/get-contracts`, { headers: { authorization: 'Bearer ' + token } });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getContractStudent = async () => {
    try {
        const res = await httpRequest.get(`contract/get-contract-student`, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getLiquidation = async () => {
    try {
        const res = await httpRequest.get(`contract/get-liquidation`, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const liquidationContract = async ({ id }) => {
    try {
        const res = await httpRequest.get(
            `contract/${id}/liquidation-contracts`,
            {
                headers: { authorization: 'Bearer ' + token },
            },
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteLiquidation = async ({ id }) => {
    try {
        const res = await httpRequest.get(`contract/${id}/delete-contracts`, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const createContract = async (data) => {
    try {
        const res = await httpRequest.put(`contract/create-contracts`, data, {
            headers: { authorization: 'Bearer ' + token },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
