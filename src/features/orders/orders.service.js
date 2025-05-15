const { AddressModel } = require("../address/address.model.js");
const { CartModel } = require("../carts/carts.model.js");
const { OrderModel } = require("./orders.model.js");

async function generateOrderService(uid, { address, shippingFee }) {
    const cartData = await CartModel.findById(uid).select({
        discount: true,
        total: true,
        subtotal: true,
        items: true,
        tax: true,
        _id: false
    }).lean();

    if (!cartData) throw new Error("Cart doesn't exist for this user!");

    const addressData = await AddressModel.findOne({ _id: address, uid }).select({
        name: true,
        phone: true,
        address1: true,
        address2: true,
        city: true,
        state: true,
        zipcode: true,
        _id: false
    }).lean();

    if (!addressData) throw new Error("Address doesn't exist for this user!");

    const order = new OrderModel({
        address: addressData,
        items: cartData.items,
        uid,
        shippingFee,
        subtotal: cartData.subtotal,
        tax: cartData.tax,
        discount: cartData.discount,
        status: "pending"
    });

    const orderResult = await order.save();

    await CartModel.deleteOne({ _id: uid });

    return orderResult;
}

async function getAllOrdersByUIDService(uid) {
    return await OrderModel.find({ uid }).sort({ createdAt: -1 }).lean();
}

async function getOrderDetailsByIDService(uid, id) {
    const order = await OrderModel.findOne({ _id: id, uid }).lean();
    if (!order) throw new Error("Order not found or unauthorized.");
    return order;
}

async function updateOrderByIDService(uid, id, updateFields) {
    const updated = await OrderModel.findOneAndUpdate(
        { _id: id, uid },
        updateFields,
        { new: true }
    ).lean();
    if (!updated) throw new Error("Order not found or unauthorized.");
    return updated;
}

module.exports = {
    generateOrderService,
    getAllOrdersByUIDService,
    getOrderDetailsByIDService,
    updateOrderByIDService
};
