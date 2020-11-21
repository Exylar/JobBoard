const bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    firstname: {
      type: 'string',
      required: true
    },
    lastname: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    phone: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    role: {
      type: 'string'
    },
    id_company: {
      model: 'company'//only if role == 'entreprise'
    },
    apply: {
      collection: 'apply',
      via: 'id_user'
    }
  },

      // Here we encrypt password before creating a User
      beforeCreate(values, next) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                sails.log.error(err);
                return next();
            }

            bcrypt.hash(values.password, salt, (err, hash) => {
                if (err) {
                    sails.log.error(err);
                    return next();
                }
                values.password = hash; // Here is our encrypted password
                return next();
            });
        });
    },

    hashPassword(password) {
        return new Promise(function(resolve, reject) {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {sails.log.error(err); return reject();}
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {sails.log.error(err); return reject();}
                    return resolve(hash);
                })
            })
        })
    },

    comparePassword(password, encryptedPassword) {
        return new Promise(function(resolve, reject) {
            bcrypt.compare(password, encryptedPassword, (err, match) => {
                if (err) {
                    sails.log.error(err);
                    return reject(false);
                }
                if (match)
                  return resolve(true);
                else 
                  return resolve(false);
            });
        });
    }
};