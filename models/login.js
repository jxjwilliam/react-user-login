const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// set up a mongoose model
const LoginSchema = new Schema({
  email: String,
  password: String
});

LoginSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

LoginSchema.methods.validPassword = (password, this_password) => {
  return bcrypt.compareSync(password, this_password)
}

module.exports = mongoose.model('Login', LoginSchema);