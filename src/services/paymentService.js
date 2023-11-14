import { httpRequest } from '~/utils/httprequest';

export const payStripe = async ({ amount, token }) => {
    try {
        const res = await httpRequest.post(`payment/sent-payment`, { amount, token });
        return res
    } catch (error) {
        console.log(error);
    }
};
