const Sequelize = require("sequelize");
const sequelize = require("../util/db");

const ForgotPasswordReset = sequelize.define("ForgotPasswordRequest", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    isActive: Sequelize.BOOLEAN,
});

module.exports = ForgotPasswordReset;