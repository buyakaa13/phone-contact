import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    bookmarked: {type: Boolean, required: true }
});

export const Contact = mongoose.model('Contact', contactSchema);
