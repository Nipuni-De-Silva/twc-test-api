// token(encrypted json) => json

import jwt from 'jsonwebtoken';

// const secretKey = require('./key');
import secretKey from './key';

function verifyToken(token: string){
    try{
        var decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch(err){
        console.log(err)
    }
}

export default verifyToken;