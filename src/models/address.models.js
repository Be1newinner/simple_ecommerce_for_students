import { Schema, Model, model } from "mongoose";

// Indian Based Addresses
const AddressSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address1: { type: String, required: true },
    address2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    uid: {
        type: Schema.Types.ObjectId, required: true,
        ref: "users"
    },
}, {
    timestamps: true
})

export const AddressModel = model("Address", AddressSchema)