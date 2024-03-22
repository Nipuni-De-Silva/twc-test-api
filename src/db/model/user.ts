import mongoose from 'mongoose';

import { contactSchema } from './contact';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String,
    token: String,
    contactList: [contactSchema]
});

const User = model('User', userSchema);

export default User;