import mongoose from "mongoose";
const {Schema, model} = mongoose;

const contactSchema = new Schema({
    fullName: String,
    gender: String,
    email: String,
    phoneNumber: String
});

//const Contact = model('Contact', contactSchema);

export {contactSchema}

//export default Contact