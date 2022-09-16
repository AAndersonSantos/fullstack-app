const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cors = require('cors')
app.use(cors())

const registerRoutes = require("./src/routes/registerRoutes");
const loginRoutes = require("./src/routes/loginRoutes");
const postsRoutes = require("./src/routes/postsRoutes");

//Router register
app.use(registerRoutes);

//Router login
app.use(loginRoutes);

//Router posts
app.use(postsRoutes);

module.exports = app