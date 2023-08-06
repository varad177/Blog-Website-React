import axios from "axios";
import { API_NOTIFICATION_MESSAGE, SERVICE_URLS } from "../constants/config";
import { getaccessToken , gettype } from "../utils/commonUtils";


const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",

    },
});

//=> for request

//isme do callback fun hote haii
// pehla  callback fun hota hai successfull ke bare me
//which is config

//dusra callback function error ke liye hota hai

axiosInstance.interceptors.request.use(
    function (config) {
        if(config.TYPE.params){
            config.params = config.TYPE.params;
        } else if(config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;

        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

//=> response

axiosInstance.interceptors.response.use(
    function (response) {
        //stop the loader here
        return processresponse(response);
    },

    function (error) {
        return Promise.reject(processError(error));
    }
);

// making the fun

// if success - > return {isSucess  : true , data : object}
// if fail -> return { isfailure :  true , status : string , message : string , code : int   }


const processresponse = (response) => {
    if (response?.status === 200) {
        return {
            isSuccess: true,
            data: response.data
        }
    }
    else {
        return {
            isFailure: true,
            status: response?.status,
            message: response?.message,
            code: response?.code

        }

    }
}



const processError = (error) => {
    if (error.response) {
        //request made and server responded status other than 200 range 
        console.log('ERROR IN response', error.toJSON());
        return {
            isError: true,
            message: API_NOTIFICATION_MESSAGE.responceFailure,
            code: error.response.status
        }


    } else if (error.request) {
        //reques made but not getting the request 
        console.log('ERROR IN REQUEST', error.toJSON());
        return {
            isError: true,
            message: API_NOTIFICATION_MESSAGE.requestFailure,
            code: ""
        }

    } else {
        //something wrong  happended to the fronend 
        console.log('ERROR IN NETWORK', error.toJSON());
        return {
            isError: true,
            message: API_NOTIFICATION_MESSAGE.networkError,
            code: ''
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {

    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE'? {}: body,
            responseType: value.responseType,
            headers: {
                authorization: getaccessToken()
            },

            TYPE : gettype(value , body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percentageCompleted)
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(percentageCompleted)
                }
            },

        })
}


export { API };
