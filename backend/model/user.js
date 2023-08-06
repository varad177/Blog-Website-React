
//mogoose ke help se schema banate hai 

import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    username: {
        unique : true,
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },


})

const user = mongoose.model('user' , userSchema)
export default user;