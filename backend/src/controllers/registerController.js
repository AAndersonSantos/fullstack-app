const modelUsers = require('../../database/models/users');
const bcrypt = require('bcrypt')

//--------------------------------------- Register ----------------------------
exports.register = async function(req, res){

    let { first_name, last_name, state, city, email, password, confirmPassword } = req.body

    if (!first_name) {
        return res.status(422).json({ msg: "O campo nome é obrigatório" })
    }

    if (!last_name.trim()) {
        return res.status(422).json({ msg: "Não pode conter somente espaços em branco." })
    }

    if (!last_name) {
        return res.status(422).json({ msg: "O campo sobrenome é obrigatório" })
    }

    if (!last_name.trim()) {
        return res.status(422).json({ msg: "Não pode conter somente espaços em branco." })
    }

    if (!state) {
        return res.status(422).json({ msg: "O campo estado é obrigatório" })
    }

    if (!city) {
        return res.status(422).json({ msg: "O campo cidade é obrigatório" })
    }

    if (!email) {
        return res.status(422).json({ msg: "O campo email é obrigatório" })
    }

    if (!password) {
        return res.status(422).json({ msg: "O campo password é obrigatório" })
    }

    if (!password.match(/^(?=.*[A-Z])(?=.*[!#@$%&*])(?=.*[0-9])(?=.*[a-z]).{6,25}$/)) {
        return res.status(422).json({
            msg: "A senha deve ter o tamanho mínimo de 6 e no máximo 25 caracteres. " +
                "Deve ter somente letras e numeros e caracteres especial(!#@$%&*). " +
                "Deve ter no mínimo uma letra maiúscula e minúscula. " +
                "Deve ter no mínimo um numero. " +
                "Deve ter no mínimo um caractere especial(!#@$%&*)."
        })
    }

    if (password !== confirmPassword) {
        return res.status(422).json({ msg: "As senhas não conferem" })
    }

    const userExists = await modelUsers.findOne({ where: { email: email } })

    if (userExists) {
        return res.status(422).json({ msg: "Esse email ja existe" })
    }

    //create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new modelUsers({
        first_name,
        last_name,
        state,
        city,
        email,
        password: passwordHash,
    })

    try {

        await user.save()
        res.status(201).json({ msg: "Usuario salvo com sucesso" })

    } catch (erro) {
        console.log(erro)
        res.status(500).json({ msg: "Aconteceu um erro" })
    }
}