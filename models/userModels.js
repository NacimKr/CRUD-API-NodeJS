const mongooseConnect = require('../db/db')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  login: {type: String, requred: true},
  password: {type: String, requred: true}
});

module.exports = mongoose.model('UserAuth', userSchema);