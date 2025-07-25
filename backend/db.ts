import mongoose from "mongoose";

import {CONNECTION_STRING} from './config'


mongoose.connect(CONNECTION_STRING)

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String
})

const accountSchema= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

export const User = mongoose.model('User',userSchema)
export const Account = mongoose.model('Account',accountSchema)
