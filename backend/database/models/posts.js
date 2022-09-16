const sequelize = require('sequelize');
const db = require('../db');
const Users = require('./users');

const postsdb = db.define('posts' , {
    id: {
        type:sequelize.INTEGER,
        autoIncrement: true,
        allowNULL: false,
        primaryKey: true
    },
    titulo: {
        type:sequelize.STRING,
        allowNULL: false,
        required: true,
        validate: {
			notEmpty: true
		}
    },
    descricao: {
        type:sequelize.TEXT,
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
    }

})

Users.hasMany(postsdb, {
    foreignKey: 'id_user',
    as: "posts"
})


//postsdb.sync({force: true});
module.exports = postsdb