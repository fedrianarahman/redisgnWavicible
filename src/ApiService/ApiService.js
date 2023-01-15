import axios from "axios";

let config = require("./config.json");

export const ApiService = {

    get: (url, params, configLocal) => {
        const getToken = configLocal ? configLocal.token || localStorage.getItem("token") : localStorage.getItem("token");
        // console.log("line 9", getToken);
        const localConfigAxios = {
            headers: {
                'Authorization': `Bearer ${getToken}`,
            },
            params,
            ...configLocal
        }
        return axios.get(config.host + url, localConfigAxios)
    },

    post: (url, params, configLocal) => {
        const getToken = configLocal ? configLocal.token || localStorage.getItem("token") : localStorage.getItem("token");
        const localConfigAxios = {
            headers: {
                'Authorization': `Bearer ${getToken}`,
            },
            ...configLocal
        }

        return axios.post(config.host + url, params, localConfigAxios)
    },

}