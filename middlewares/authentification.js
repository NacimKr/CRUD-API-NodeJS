const jwt = require('jsonwebtoken');

const authentification = (req, res, next) => {
  const getToken = req.headers.authorization.split(' ')[1];

  const getIDFromToken = jwt.verify(getToken, "shhhhh");
  // console.log(getIDFromToken);
  // console.log(req.body.userID);


  if(req._body){
    if(req.body.userID === getIDFromToken.id){
      // res.status(200).json({
      //   message:"Authentification réussie"
      // })
      next();
    }else{
      res.status(404).json({
        message:"Authentification non réussie"
      })
    }
  }else{
    next()
  }
  
}

module.exports = authentification