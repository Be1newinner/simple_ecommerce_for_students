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

export const generateOrder = () => (req, res) => {
    try {
        const {
            uid,
            address,
            items,
            shippingFee,
        } = req.body;



    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Unable to generate Order!",
            data: null
        })
    }
}