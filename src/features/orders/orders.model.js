const { Schema, model, Types } = require("mongoose");
const { cartItemSchema, CartPricingSchema } = require("../carts/carts.model.js");
const { AddressBaseSchema } = require("../address/address.model.js");


// PricingSchema
const OrderSchema = new Schema({
    address: { type: AddressBaseSchema, required: true },
    items: {
        type: [cartItemSchema],
        required: true
    },
    uid: { type: Types.ObjectId, ref: "users", required: true },
    shippingFee: { type: Number, default: 0, min: 0 },
    status: {
        type: String,
        enum: ["Placed", "Confirmed", "Shipped", "OFD", "Delivered", "Cancelled", "Returned"],
        default: "Placed"
    },

    // ORDER PROGRESS TIMESTAMPS
    orderTimeline: {
        placedAt: { type: Date, default: Date.now, required: true },
        confirmedAt: { type: Date },
        shippedAt: { type: Date },
        ofdAt: { type: Date },
        deliveredAt: { type: Date },
        cancelledAt: { type: Date },
        returnedAt: { type: Date }
    },
}, {
    autoIndex: true,
    timestamps: true
})

OrderSchema.add(CartPricingSchema)

const OrderModel = model("Order", OrderSchema);

module.exports = {
    OrderModel
}