import { httpRequest } from '~/utils/httprequest';

const token = window.localStorage.token;
export const getStudents = async ({ page, perPage, q }) => {
    try {
        const res = await httpRequest.get('student/get-students', {
            headers: {
                authorization: 'Bearer ' + token,
            },
            params: {
                page,
                per_page: perPage,
                q,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
