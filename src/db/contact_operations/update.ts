import User from "../model/user";
import { ContactDetails } from "./add";

import { Types } from 'mongoose'

async function updateContact(userID: string, contactID: string, contactDetails: ContactDetails) {
    const parentId = new Types.ObjectId(userID);
    const subDocumentId = new Types.ObjectId(contactID);
    const user = await User.findById(parentId);
    if (user != null) {
        try {
            user.contactList.id(subDocumentId)!.fullName = contactDetails.fullName
            user.contactList.id(subDocumentId)!.gender = contactDetails.gender
            user.contactList.id(subDocumentId)!.email = contactDetails.email
            user.contactList.id(subDocumentId)!.phoneNumber = contactDetails.phoneNumber
            await user.save();
        } catch (e) {
            throw Error("Update failed !")
        }

    } else {
        throw Error('User ID not found !')
    }
}

export default updateContact