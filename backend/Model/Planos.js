const { DataTypes } = require('sequelize')
const User = require('../Model/User')
const db = require('../db/conn')

const Planos = db.define('Planos', {
    tipo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


Planos.belongsTo(User)
User.hasMany(Planos)


module.exports = Planos
