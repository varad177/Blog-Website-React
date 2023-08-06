
//api notifivation messages

export const API_NOTIFICATION_MESSAGE = {
    loading: {
        title: "loading",
        message: 'data is loading'
    },

    success: {
        title: 'success',
        message: 'data successfully loaded'
    },

    responceFailure: {
        title: 'error',
        message: 'An error occured while fetching the responce from server , please try again'
    },
    requestFailure: {
        title: 'error',
        message: 'an error accured while parsing the request data'
    },
    networkError: {
        title: 'error',
        message: 'unable to connect , please check internet connectivity'

    }

}


// api serveice calls

export const SERVICE_URLS = {
    userSignup: {
        url: '/signup', method: 'POST'
    },
    userLogin: {
        url: '/login', method: 'POST'
    },
    uploadfile: {
        url: '/file/upload', method: 'POST'
    },
    createpost: {
        url: 'create', method: 'POST'
    },
    getallpost: {
        url: '/posts', method: 'GET' , params : true
    },
    getpostbyid:{
        url:'post' , method : 'GET'  , query : true
    },
    updatePost :{
        url: 'update' , method : 'put' , query : true
    },
    deletepost :{
        url:'delete' , method: 'DELETE' , query : true
    }

}