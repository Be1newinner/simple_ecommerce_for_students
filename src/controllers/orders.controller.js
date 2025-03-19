import { AddressModel } from "../models/address.models.js"
import { CartModel } from "../models/carts.model.js"
import { OrderModel } from "../models/orders.model.js"

export const getOrderDetailsByID = (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Unable to retrieve Order Detail",
            data: null
        })
    }
}

export const getAllOrdersByUID = (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Unable to retrieve orders",
            data: null
        })
    }
}

export const updateOrderByID = (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Unable to update order detail",
            data: null
        })
    }
}

export const generateOrder = async (req, res) => {
    try {
        const {
            address,
            shippingFee,
        } = req.body;

        const { uid } = req.locals;

        const cartData = await CartModel.findById(uid).select({
            discount: true,
            total: true,
            subtotal: true,
            items: true,
            tax: true
        }).lean();
        console.log({ cartData });

        const addressData = await AddressModel.findById(address).select({
            name: true,
            phone: true,
            address1: true,
            address2: true,
            city: true,
            state: true,
            zipcode: true
        }).lean();
        console.log({ addressData });

        const orderResponse = await OrderModel.insertOne({
            address: {
                name: addressData.name,
                phone: addressData.phone,
                address1: addressData.address1,
                address2: addressData.address2,
                city: addressData.city,
                state: addressData.state,
                zipcode: addressData.zipcode,
            },
            items: cartData.items,
            uid,
            shippingFee,
            subtotal: cartData.subtotal,
            tax: cartData.tax,
            discount: cartData.discount
        })

        console.log(orderResponse)

        res.end()


    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Unable to generate Order!",
            data: null
        })
    }
}