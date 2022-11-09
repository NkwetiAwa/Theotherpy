const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  doctor: { type: Boolean, default: false },         // 0 => user, 1 => doctor
  email: { type: String, unique: true  },
  phone: { type: String },
  bio: { type: String },
  pic: { type: String },
  password: { type: String },
  fields: { type: [String] },
  job: { type: String },
  location: { type: String },
  verified: { type: Boolean, default: false },
  active: { type: Boolean, default: false }
}, {timestamps: true});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);