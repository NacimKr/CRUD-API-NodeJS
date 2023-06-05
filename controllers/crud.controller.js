const userCRUDModel = require('../models/userCRUD');
const jwt = require('jsonwebtoken');
const userModels = require('../models/userModels');
const fs = require('fs');

const create = (req, res) => {
  // console.log(req.file);
  const jsonToObj = JSON.parse(req.body.user);
  //console.log(jsonToObj)

  const newUser = new userCRUDModel({...
    jsonToObj,
    image: "http://localhost:3000/images/"+req.file.originalname
  })
  newUser.save();

  res.status(201).json({
    message:"Utilisateur créé avec succès"
  })
}

const read = async(req, res) => {
  const listUser = await userCRUDModel.find()
  //console.log(listUser)


  res.status(200).json({
    message:"Listes des utilisateurs inscrits",
    users: listUser
  })
}

const update = async(req, res) => {
  const updateUser = await userCRUDModel.findOneAndUpdate(
    {_id:req.params.id},
    {...req.body}
  );

  const {name, image} = req.body

  if(name !== updateUser.name || image !== updateUser.image){
    res.status(201).json({
      message: "Votre utilisateurs a bien été mis à jour",
      users: updateUser
    })
  }else{
    res.status(201).json({
      message: "Aucune modification a été apportée",
      users: updateUser
    })
  }
}

const deleted = async(req, res) => {
  const getTokenForDelelete = req.headers.authorization.split(' ')[1];
  const isSameUser = jwt.verify(getTokenForDelelete, "shhhhh")
  const jsonToObject = JSON.parse(req.body.user);

  if(jsonToObject.userID === isSameUser.id){
    await userCRUDModel.findOneAndDelete(
      {_id:req.params.id},
      {...req.body}
    );

    // Cette fonction permet de supprimer le fichier lié 
    // au user selectionnée par son id
    fs.unlinkSync(req.file.path)

    res.status(200).json({
      message:"Utilisateur a bien été supprimé"
    })
  }else{
    res.status(400).json({
      message:"Vous ne pouvez pas supprimé cet utilisateur"
    })
  }
}

module.exports = {create, read, update, deleted}