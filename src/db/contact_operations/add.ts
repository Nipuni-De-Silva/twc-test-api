import User from "../model/user";

interface ContactDetails {
    fullName: string,
    gender: string,
    email: string,
    phoneNumber: string
}

async function addContact(userID: String, contactDetails: ContactDetails) {
    const user = await User.findById(userID);
    if (user != null) {
        user.contactList.push(contactDetails);
        await user.save();
    } else {
        throw Error('User ID not found !')
    }
    
}


export {ContactDetails}

export default addContact;