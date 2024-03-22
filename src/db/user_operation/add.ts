import User from '../model/user';

async function addUser( email: String, password: String ){
    try {
        const user = await User.create({ email: email, password: password});
        return user;
    } catch (e){
        // console.log(e)
        throw Error("User registration failed !");
    }
}

export default addUser;