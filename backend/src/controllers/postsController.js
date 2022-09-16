const modelPosts = require('../../database/models/posts');

//---------------------------------- create posts ------------------------------
exports.createPosts = function(req, res){

    const userData = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        id_user: req.body.id_user
    }

    modelPosts.create(userData).then(function () {
        res.status(200).json({ message: 'Salvo com sucesso!' });
    }).catch(function (erro) {
        res.send("Houve um erro: " + erro)
    })

}

//---------------------------------- find all users ------------------------------
exports.findAllPosts = function(req, res){
    modelPosts.findAll({ where: {id_user: req.userId}}).then((usuarios) => {
        res.status(200).json(usuarios)
    }).catch((err) => {
        res.status(400).json({ error: "Houve um erro", err })
    })
}

//---------------------------------------- Delete ------------------------------------
exports.deletePosts =  function(req, res){
    modelPosts.destroy({where: {id: req.params.id}}).then(function(){
        res.status(200).json({ message: 'Deletado com sucesso' });
    }).catch(function(erro){
        res.send("Houve um erro: " + erro)
    })
}