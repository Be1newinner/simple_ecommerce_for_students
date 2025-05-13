const {
    generateOrderService,
    getAllOrdersByUIDService,
    getOrderDetailsByIDService,
    updateOrderByIDService
} = require("./orders.service.js");

const generateOrder = async (req, res) => {
    try {
        const { uid } = req.locals;
        const data = await generateOrderService(uid, req.body);
        res.status(201).json({
            error: null,
            message: "Order generated successfully",
            data
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Unable to generate order",
            data: null
        });
    }
};

const getAllOrdersByUID = async (req, res) => {
    try {
        const { uid } = req.locals;
        const data = await getAllOrdersByUIDService(uid);
        res.status(200).json({
            error: null,
            message: "Orders fetched",
            data
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Unable to fetch orders",
            data: null
        });
    }
};

const getOrderDetailsByID = async (req, res) => {
    try {
        const { uid } = req.locals;
        const { id } = req.params;
        const data = await getOrderDetailsByIDService(uid, id);
        res.status(200).json({
            error: null,
            message: "Order detail fetched",
            data
        });
    } catch (error) {
        res.status(404).json({
            error: error.message,
            message: "Unable to fetch order",
            data: null
        });
    }
};

const updateOrderByID = async (req, res) => {
    try {
        const { uid } = req.locals;
        const { id } = req.params;
        const data = await updateOrderByIDService(uid, id, req.body);
        res.status(200).json({
            error: null,
            message: "Order updated",
            data
        });
    } catch (error) {
        res.status(404).json({
            error: error.message,
            message: "Unable to update order",
            data: null
        });
    }
};

module.exports = {
    generateOrder,
    getAllOrdersByUID,
    getOrderDetailsByID,
    updateOrderByID
};
