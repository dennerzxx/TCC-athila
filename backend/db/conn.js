//conn.js
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('registergym', 'root', 'sucesso', { //alterar o nome do banco, user e senha
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conexao ao banco')
} catch (error) {
    console.log('Não foi possivel conectar ao banco ', error)
}

module.exports = sequelize