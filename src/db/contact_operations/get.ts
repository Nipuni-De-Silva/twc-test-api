import User from '../model/user';
import { ContactDetails } from './add';

import { Types } from 'mongoose';

async function getContacts(userID: string) {
    const parentId = new Types.ObjectId(userID);
    const user = await User.findById(parentId);
    if (user !== null) {
        return user.contactList;
    } else {
        throw Error('User ID not found!')
    }
}


export default getContacts;
