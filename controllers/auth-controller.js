import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import Jimp from 'jimp';
import fs from 'fs/promises';
import path from 'path';
import User from '../models/user.js'

import { ctrlWrapper } from '../decorators/index.js'

import { HttpError } from '../helpers/index.js'

const { JWT_SECRET } = process.env;

const avatarPath = path.resolve("public", "avatars")

const signup = async (req, res) => {
    console.log('req.body', req.body)
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const avatarURL = gravatar.url(email);

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    
    if (!user) {
    throw HttpError(401, "Email or password is wrong")
    }
    
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '23h'});
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token
    })
}

const getCurrent = (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription
    })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.json({
        message: "Logout successful"
    })
}

const changeAvatar = async (req, res) => {
    const { _id } = req.user;

    const { path: oldPath, filename } = req.file;

    const newPath = path.join(avatarPath, filename);

        Jimp.read(oldPath, (err, avatar) => {
            if (err) throw err;
            
            avatar
            .resize(250, 250)
            .write(newPath)
        })
    
    await fs.rename(oldPath, newPath);
    const avatarURL = path.join('avatars', filename)

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
        avatarURL,
    })
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    changeAvatar: ctrlWrapper(changeAvatar)
}