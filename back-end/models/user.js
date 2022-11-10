"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        User.hasOne(models.Profile)
        }
    }
    User.init(
        {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "username",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "email",
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "phone_number",
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            len: [8],
            },
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        code_otp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        attempt: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        },
        {
        sequelize,
        modelName: "User",
        }
    );
    return User;
};