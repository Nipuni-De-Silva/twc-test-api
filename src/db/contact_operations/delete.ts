import mongoose from 'mongoose';
import { Types } from 'mongoose';

import User from "../model/user";

async function deleteContact(userID: string, contactID: string) {
    const parentId = new Types.ObjectId(userID);
    const subDocumentId = new Types.ObjectId(contactID);
    //const subDocumentId = new mongoose.Types.ObjectId(contactID);

    const user = await User.findById(parentId);
    if (user != null) {
        try {
            user.contactList.id(subDocumentId)?.deleteOne();
            await user.save();
        } catch (e) {
            throw Error('Contact delete failed')
        }
        
    } else {
        throw Error('User ID not found !')
    }
}

export default deleteContact;