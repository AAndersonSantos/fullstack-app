const modelUsers = require('../../database/models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//--------------------------------------- login ----------------------------
 exports.login = async function(req, res){

    const { email, password } = req.body

    if (!email) {
        return res.status(422).json({ msg: "O campo email é obrigatório" })
    }

    if (!password) {
        return res.status(422).json({ msg: "O campo password é obrigatório" })
    }

    //chech if user exists
    const user = await modelUsers.findOne({ where: { email: email } })

    if (!user) {
        return res.status(422).json({ error: "Usuário não encontrado" })
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password)

    const payload = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    }

    if (!checkPassword) {
        return res.status(422).json({ error: "Senha inválida" })
    }

    try {
        const secret = process.env.SECRET_KEY
        const token = jwt.sign(payload, secret, { expiresIn: '1d' })
        res.status(200).json({ msg: "Login Realizado com sucesso!", token })

    } catch (erro) {
        console.log(erro)
        res.status(500).json({ msg: "Aconteceu um erro" })
    }

}