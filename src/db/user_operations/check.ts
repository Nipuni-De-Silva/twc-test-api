import User from '../model/user';

async function checkUser(email: string){
    // Using email find the user
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return 'Found';
        } else {
            return 'Not Found';
        }
    } catch (e) {
        throw e;
    }
    // chack user password match this password
}

export default checkUser;