// json => token(encrypted json)

import jwt from 'jsonwebtoken'
// const secretKey = require('./key')
import secretKey from './key'

interface UserCredentials {
    email: String,
    password: String
}


function generateToken(userCredentials: UserCredentials) {
    return jwt.sign(userCredentials, secretKey);
}

export default generateToken;
