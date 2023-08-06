


import mongoose from "mongoose";

const postSchema = mongoose.Schema({


    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    picture: {
        type: String
    },
    username: {
        type: String,
        require: true
    },
    category: {
        type: String

    },
    createdDate: {
        type: Date
    }

})

const post = mongoose.model('post', postSchema)
export default post