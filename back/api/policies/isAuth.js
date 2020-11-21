'use strict';

const userService = require('../services/user.service')
module.exports = async (req, res, next) => {
  let token;

  if (req.headers && req.headers.token) {
    token = req.headers.token;
    if (token.length <= 0) return res.status(401).json({err: 'Format is Authorization: Bearer [token]'});

  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.status(401).json({err: 'No Authorization header was found'});
  }

  let userPayload = await userService.checkToken(token);
  let user = await User.findOne({id: userPayload.id});
  if (userPayload) {
    req.user = user
    next();
  } else {
    return res.forbidden();
  }
}