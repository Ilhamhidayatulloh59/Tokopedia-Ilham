"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here

    ;
    }
    }
    Product.init(
        {
            name_product: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: "name_product",
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            images: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Product",
        }
    );
    return Product;
};