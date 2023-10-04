const Planos = require('../Model/Planos')
const User = require('../Model/User')
const getToken = require('../Helpers/get-token')
const getUserByToken = require('../Helpers/get-user-by-token')

const jwt = require('jsonwebtoken')


module.exports = class PlanosController {
    static async create(req, res) {
        const { tipo, titulo } = req.body

        if (!tipo) {
            res.status(422).json({ message: 'O tipo é obrigatório' })
            return
        }
        if (!titulo) {
            res.status(422).json({ message: 'O titulo é obrigatório' })
            return
        }

        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        const planos = new Planos({
            tipo: tipo,
            titulo: titulo,
            UserId: currentUser.id
        });
        try {
            const newPlanos = await planos.save();
            res.status(201).json({ message: 'Plano cadastrado com sucesso', newPlanos });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}
