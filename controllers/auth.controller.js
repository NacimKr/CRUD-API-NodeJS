const userModels = require("../models/userModels")
var jwt = require('jsonwebtoken');
const validator = require('validator')

const signUp = (req, res) => {
  const {login, password} = req.body;

  const signUpUser = new userModels({
    login,
    password
  })
  signUpUser.save()

  res.status(201).json({
    message:"Votre compte a bien été créer avec succés",
    users:signUpUser
  })
}

const login = async(req, res) => {
  const getUserToLogin = await userModels.find({ login : req.body.login})
  
  if(!getUserToLogin){
    res.status(404).json({
      message:"Utilisateur introuvable"
    });
  }

  const isValidPassword = req.body.password === getUserToLogin[0].password
  
  if(isValidPassword){
    const token = jwt.sign({ id: getUserToLogin[0]._id }, 'shhhhh');
    res.status(200).json({
      message:"Connexion réussi",
      token,
      id: getUserToLogin[0]._id
    })
  }else{
    res.status(400).json({
      message:"le mot de passe est incorrect"
    })
  }
}

module.exports = {signUp, login}