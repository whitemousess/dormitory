import axios from "axios";

export const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export const get = async (path,option) => {
    const response = await httpRequest.get(path,path);
    return response.data
}