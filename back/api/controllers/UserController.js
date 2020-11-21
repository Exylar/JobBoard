const { compareSync } = require('bcrypt');
let userService = require('../services/user.service');

module.exports = {
  get: async function (req, res) {
    let user = await User.find({
      where: {id: req.param('id')},
      select: ['firstname', 'lastname', 'email', "phone"]
    })
      
    return res.status(200).json(user);
  },

  create: async function (req, res) {
    const { email, pass, firstName, lastName, isEnterprise } = req.body;
    let existingUser = null;

    if (!email || !pass || !firstName || !lastName)
      return res.badRequest();

    existingUser = await User.find({ email });//check email existing
    if (existingUser.length > 0)
      return (res.status(400).send('Mail exists'));

    try {
      let enterprise;
      if (isEnterprise) {
        enterprise = await Company.create({
          name: req.body.entrepriseName,
          email
        }).fetch();
      }
      let user = await User.create({
        email,
        password: pass,
        firstname: firstName,
        lastname: lastName,
        phone: '3630', //TODO
        role: isEnterprise ? 'enterprise' : 'user',
        id_company: isEnterprise ? enterprise.id : null
      }).fetch();
      res.json({
        token: userService.generateToken(user),
        name: user.name,
        email: user.email,
        id: user.id
      });
    } catch (err) {
      sails.log.error(err);
      return res.serverError("Something went wrong");
    }
  },

  login: async function(req, res) {
    const {email, pass} = req.body;
    let user = null;

    if (!email || !pass) return res.badRequest('Email and password required');
    user = await User.find({email});
    if (user.length != 1)
      return res.notFound();
    user = user[0];
    try {
      if (await userService.checkPassword(email, pass)) {
        return res.send({
          token: userService.generateToken(user),
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          role: user.role,
          id: user.id,
          id_company: user.id_company
        })
      } else {
        return (res.forbidden());
      }
    } catch (e) {
      sails.log.error(e);
      return (res.serverError());
    }
  },

  verify: async function (req, res) {
    let user = null;
    let userPayload = null;
    const {email, token} = req.body;

    if (!email || !token)
      return res.badRequest();
    userPayload = await userService.checkToken(token);
    if (!userPayload)
      res.forbidden();
    user = await User.find({email});
    if (user.length != 1)
      res.notFound();
    user = user[0];
    if (userPayload.id == user.id)
      res.ok();
    else
      res.forbidden();
  },

  update: async function (req, res) {
    let userId = req.param('id');
    const { firstname, lastname, email, phone } = req.body;

    if (!firstname || !lastname || !email || !phone)
      return (res.badRequest());

    await User.update({ id: userId }).set({ firstname: firstname, lastname: lastname, email: email, phone: phone});
    return res.ok();
  },

  delete: async function (req, res) {
    return res.ok()
  },
};
