const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
    static validations(name, email, password, confirmPassword, phone) {

    }

    static async register(req, res) {
        const { name, email, password, confirmPassword, phone } = req.body

        //validations
        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório!' })
        }
        if (!email) {
            return res.status(422).json({ message: 'O email é obrigatório!' })
        }
        if (!password) {
            return res.status(422).json({ message: 'A senha é obrigatória!' })
        }
        if (!confirmPassword) {
            return res.status(422).json({ message: 'Confirme sua senha!' })
        }
        if (!phone) {
            return res.status(422).json({ message: 'O telefne é obrigatório!' })
        }
        //verifying the password i macth
        if (password !== confirmPassword) {
            return res.status(422).json({ message: 'As não considerem!' })
        }
        //check if user exists
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            return res.status(422).json({ message: 'Por favor, utilize outro email!' })
        }
        //create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        //create user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })
        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body
        //validations
        if (!email) {
            return res.status(422).json({ message: 'O email é obrigatório!' })
        }
        if (!password) {
            return res.status(422).json({ message: 'A senha é obrigatória!' })
        }

        //check if user exists
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(422).json({ message: 'Não há usuário cadastrado com esse email!' })
        }
        //check if the password match with db password
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(422).json({ message: 'Senha inválida!' })
        }
        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser
        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, "thisisthesecreteintegraldecosxdx")
            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined
        } else {
            currentUser = null
        }

        return res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id
        const user = await User.findById(id).select('-password') // user.password = undefined
        if (!user) {
            return res.status(422).json({ message: 'Usuário não encontrado!' })
        }

        return res.status(200).json({ user })
    }

    static async editUser(req, res) {
        const id = req.params.id

        //check if user exists
        const token = getToken(req)
        const user = await getUserByToken(token)
        const { name, email, phone, password, confirmPassword } = req.body
        const image = ''
        if (req.file) {
            user.image = req.file.filename
        }
        if (!user) {
            return res.status(422).json({ message: 'Usuário não encontrado!' })
        }

        //validations
        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório!' })
        }
        user.name = name
        if (!email) {
            return res.status(422).json({ message: 'O email é obrigatório!' })
        }

        //check if email has already taken
        const userExists = await User.findOne({ email: email })
        if (user.email !== email && userExists) {
            return res.status(422).json({ message: 'Por favor, utilize outro email!' })
        }
        user.email = email

        if (!phone) {
            return res.status(422).json({ message: 'O telefne é obrigatório!' })
        }
        user.phone = phone

        if (!password) {
            return res.status(422).json({ message: 'A senha é obrigatória!' })
        }
        if (!confirmPassword) {
            return res.status(422).json({ message: 'Confirme sua senha!' })
        }
        //verifying the password i macth
        if (password !== confirmPassword) {
            return res.status(422).json({ message: 'As senhas não considerem!' })
        } else if (password === confirmPassword && password != null) {
            //create a password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash
        }
        try {
            //return user updated data
            const upadatedUser = await User.findOneAndUpdate(
                { _id: user.id },
                { $set: user },
                { new: true },
            )
            res.status(200).json({ message: "Usuário atualizado com sucesso!" })
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }

}