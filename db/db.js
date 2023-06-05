const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/node-test');

// // const userSchema = new mongoose.Schema({
// //   name: {type: String, requred: true},
// //   image: {type: String, requred: true}
// // });

// // module.exports = mongoose.model('User', userSchema);
module.exports = mongoose;