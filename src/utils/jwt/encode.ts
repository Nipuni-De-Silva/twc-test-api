// json => token(encrypted json)

import jwt from 'jsonwebtoken'
// const secretKey = require('./key')
import secretKey from './key'

interface UserCredentials {
    email: String,
    password: String
}


function generateToken(userCredentials: UserCredentials) {
    try {
        return jwt.sign(userCredentials, secretKey);
    } catch(e) {
        throw (e);
    }
}

export default generateToken;
