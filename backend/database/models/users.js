const sequelize = require('sequelize');
const db = require('../db');

const usersdb = db.define('users' , {
    id: {
        type:sequelize.INTEGER,
        autoIncrement: true,
        allowNULL: false,
        primaryKey: true
    },
    first_name: {
        type:sequelize.STRING,
        allowNULL: false,
        required: true,
        validate: {
			notEmpty: true
		}
    },
    last_name: {
        type:sequelize.STRING,
        allowNULL: false,
        required: true,
        validate: {
			notEmpty: true
		}
    },
    state: {
        type:sequelize.STRING,
        allowNULL: false,
        required: true,
        validate: {
			notEmpty: true
		}
    },
    city: {
        type:sequelize.STRING,
        allowNULL: false,
        required: true,
        validate: {
			notEmpty: true
		}
    },
    email: {
        type:sequelize.STRING,
        allowNULL: false,
        unique: true,
        required: true,
        validate: {
			notEmpty: true,
            isEmail: true
		}
    },
    password: {
        type:sequelize.STRING,
        allowNULL: false,
        required: true,
        validate: {
			notEmpty: true
		}
    },
    createdAt: {
        type: 'TIMESTAMP',
        defaultVaue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNULL: false
    },
    updatedAt: {
        type: 'TIMESTAMP',
        defaultVaue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNULL: false
    },
});

//usersdb.sync({force: true});
module.exports = usersdb