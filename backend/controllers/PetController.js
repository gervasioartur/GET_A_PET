const Pet = require('../models/Pet')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')


module.exports = class PetController {
    //creat a pet
    static async create(req, res) {
        const { name, age, weight, color } = req.body
        const available = true
        const images = req.files

        //image upload

        //validations
        if (!name) {
            return res.status(422).json({ message: "O nome é obrigatório!" })
        }
        if (!age) {
            return res.status(422).json({ message: "A idade é obrigatória!" })
        }
        if (!weight) {
            return res.status(422).json({ message: "O peso é obrigatório!" })
        }
        if (!color) {
            return res.status(422).json({ message: "A cor é obrigatória!" })
        }
        console.log(images)
        if (images.length === 0) {
            return res.status(422).json({ message: "A imagem é obrigatória!" })
        }

        //get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        //crate a pet
        const pet = new Pet({
            name,
            weight,
            color,
            available,
            age,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })
        images.map(image => {
            pet.images.push(image.filename)
        })
        try {
            const newPet = await pet.save()
            res.status(201).json({
                message: "Pet cadastrado com sucesso!",
                newPet
            })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}