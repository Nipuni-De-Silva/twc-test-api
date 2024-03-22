import User from '../model/user';

async function checkUser(email: string){
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
}

export default checkUser;