const db = require("../models");
const product = db.Product

module.exports = {
    findAllProduct: async (req, res) => {
        try {
            const products = await product.findAll();
            res.status(200).send(products);
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },

};