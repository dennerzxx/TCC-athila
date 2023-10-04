//UserController.js
const User = require('../Model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Planos = require('../Model/Planos')



//helpers
const createUserToken = require('../Helpers/create-user-token')
const getToken = require('../Helpers/get-token')
const getUserById = require('../Helpers/get-user-by-token')
module.exports = class UserController {

    //create user
    static async register(req, res) {

        const { name, email, phone, password, confirmpassword, cpf } = req.body

        //regras de negocio
        if (!name) {
            res.status(422).json({ message: 'O nome do usuario é obrigatório' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O email do usuario é obrigatório' })
            return
        }
        if (!phone) {
            res.status(422).json({ message: 'O phone do usuario é obrigatório' })
            return
        }
        if (!cpf) {
            res.status(422).json({ message: 'O cpf do usuario é obrigatório' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'O password do usuario é obrigatório' })
            return
        }
        if (!confirmpassword) {
            res.status(422).json({ message: 'O confirmpassword do usuario é obrigatório' })
            return
        }

        if (password !== confirmpassword) {
            res.status(422).json({ message: "As senhas devem ser iguais" })
            return
        }
        //criptografando a senha do user
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //Checar se o usuario existe
        const userExists = await User.findOne({ where: { email: email } })

        if (userExists) {
            res.status(422).json({ message: 'Email já cadastrado' })
            return
        }

        const user = new User({
            name: name,
            email: email,
            phone: phone,
            cpf: cpf,
            password: passwordHash
        })

        try {
            //criar novo user no banco
            const newUser = await user.save()
            //Após criar o usuário, enviar para finalizar a criação com token
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    //aqui
    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            res.status(422).json({ message: "O email é obrigatorio" })
            return
        }
        if (!password) {
            res.status(422).json({ message: "A senha é obrigatorio" })
            return
        }

        //checar se o email existe
        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            res.status(422).json({ message: "Email nao cadastrado" })
            return

        }

        //checar se o password é igual ao do banco
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({ message: "Senha incorreta" })
            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser

        if (req.headers.authorization) {
            const token = getToken(req)

            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findByPk(decoded.id)

            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)

    }
    //aqui vamos criar o getUserById()
    static async getUserById(req, res) {
        const id = req.params.id

        const user = await User.findByPk(id, { where: { id: id } })

        if (!user) {
            res.status(422).json({ message: "Usuário não encontrado" })
            return
        }
        user.password = undefined
        res.status(200).json({ user })
    }

    static async editUser(req, res) {
        const id = req.params.id

        //checando se o user existe
        const token = getToken(req)
        const user = await getUserById(token)
        const { name, email, phone, password, confirmpassword } = req.body

        //salvando a imagem
        let image = ''
        if (req.file) {
            image = req.file.filename
        }

        if (!name) {
            res.status(422).json({ message: "O nome é obrigatorio" })
            return
        }
        if (!email) {
            res.status(422).json({ message: "O email é obrigatorio" })
            return
        }

        //checando se o email ja esta cadastrado

        const userExists = await User.findOne({ where: { email: email } })

        if (user.email !== email && userExists) {
            res.status(422).json({ message: "por favor utilize outro email" })
            return
        }

        user.email = email

        if (!phone) {
            res.status(422).json({ message: "O phone é obrigatorio" })
            return
        }

        user.phone = phone

        if (password !== confirmpassword) {
            res.status(422).json({ message: "As senhas devem ser iguais" })
            return
        } else if (password === confirmpassword != null) {
            //criando nova senha
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash
        }

        const userToUpdate = await User.findByPk(id)

        if (!userToUpdate) {
            res.status(422).json({ message: "Usuario nao encontrado" })
            return
        }
        userToUpdate.name = name
        userToUpdate.email = email
        userToUpdate.phone = phone
        userToUpdate.image = image

        if (password === confirmpassword != null) {
            //criando nova senha
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash
        }

        try {
            await userToUpdate.save()
            res.status(200).json({ message: 'Usuario atualizado com sucesso' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async addPlano(req, res) {
        const id = req.params.id

        const plano = await Planos.findByPk(id)

        if (!plano) {
            res.status(404).json({ message: "Plano não existe" });
            return;
        }

        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        if(currentUser.plano){
            res.status(422).json({ message: `Você já possui o plano: ${currentUser.plano}` });
            return;
        }

        currentUser.plano = plano.id

        await currentUser.save()

        res.status(200).json({ message: `Plano aderido com sucesso: ${currentUser.plano}` })

    }
}