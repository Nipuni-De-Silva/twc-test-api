// input -> email, password
// return -> user id

import User from '../model/user';

async function getUser(email: string, password: string){
    // Using email find the user
    try {
        const user = await User.findOne({email: email});
        if (user) {
            if(user.password == password){
                return user.id;
            } else {
                throw Error('Password mismatched');
            }
        } else {
            throw Error('No user found for that email');
        }
    } catch (e) {
        throw e;
    }
}