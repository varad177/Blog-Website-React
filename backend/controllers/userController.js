//api

import { request, response } from "express";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import Token from "../model/token.js";

export const SignUser = async (request, response) => {
    try {
        // const salt = await bcrypt.genSalt();
        const hashpassword = await bcrypt.hash(request.body.password, 10);

        const user = {
            username: request.body.username,
            name: request.body.name,
            password: hashpassword,
        };
        //but user ko validate karna padega isiliye ham model me schema banate hai

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({
            message: "sign up successfully",
        });
    } catch (error) {
        return response.status(500).json({
            message: "Error while sign up the user",
        });
    }
};

export const loginUser = async (request, response) => {
    let userExist = await User.findOne({ username: request.body.username });
    if (!userExist) {
        return response.status(400).json({ message: "username does not exist" });
    }
    try {
        let match = await bcrypt.compare(request.body.password, userExist.password);
        if (match) {
            //if match then we have to create the jwt token
            const accessToken = jwt.sign(
                userExist.toJSON(),
                process.env.ACCESS_SECRET_KEY,
                { expiresIn: "15m" }
            );

            // jwt takes two  args
            //body in json format AND secret key
            const refreshToken = jwt.sign(
                userExist.toJSON(),
                process.env.ACCESS_REFRESH_KEY
            );
            // refresh token we want later so have to sav ein the database

            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            return response
                .status(200)
                .json({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    name: userExist.name,
                    username: userExist.username,
                });
        } else {
            response.status(400).json({
                message: "password does not match",
            });
        }
    } catch (error) {
        return response.status(500).json({
            message: 'error while login in user'
        })
    }

};
