
const jwt = require('jsonwebtoken'), tokenSecret = "secretissecret";
const bcrypt = require('bcrypt');

/**
 * 
 * @param {User} user from model
 * @return generated jwt token
 */
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id
    },
    tokenSecret, // Token Secret that we sign it with
    {
      expiresIn: "30 days" // Token Expire time
    });
}

/**
 * 
 * @param {jwtToken} token
 * @return {JSON|false} payload or fail
 */
function checkToken(token) {
  return new Promise(function(resolve) {
    jwt.verify(token, tokenSecret, {}, function(err, tokArg) {
      if (err) return (resolve(false));
      resolve(tokArg);
    })
  })
}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @return {bool} success
 */
async function checkPassword(email, password) {
  let user = await User.find({email});
  
  if (user.length == 0)
    throw "Not found";
  user = user[0];
  return await User.comparePassword(password, user.password);
}

/**
 * 
 * @param {int} userId 
 * @param {string} password 
 */
async function changePassword(userId, password) {
  let hash = await User.hashPassword(password);
  await User.findOne({id: userId});

  await User.update({id: userId}).set({
    password: hash,
  })
}

module.exports = {
  generateToken,
  checkToken,
  checkPassword,
  changePassword
}