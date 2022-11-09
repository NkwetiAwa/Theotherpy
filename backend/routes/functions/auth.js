const Users = require('./../../models/Users/users');

const Auth = async(token) => {
  const user = await Users.findOne({ _id: token, active: true });
  if(user){
    return true;
  }else{
    return false;
  }
}

module.exports = { Auth }