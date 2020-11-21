const Application = require("../models/Apply");

module.exports = {
  get: async function (req, res) {
    let companyId = await Company.find({ id: req.param('id') });

    return res.status(200).json(companyId);
  },

  getJobs: async function (req, res) {
    let job = await Job.find({ id_company: req.param('id') });
    
    return res.status(200).json(job);
  },

  getApplications: async function (req, res) {
    let applications = await Apply.find().populate("id_job").populate("id_user");
    return res.status(200).json(applications);
  },

  create: async function (req, res) {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone)
      return (res.badRequest());

    await Company.create({ name, email, phone });
    return res.ok();
  },

  update: async function (req, res) {
    let companyId = req.param('id');
    const { name, email, phone } = req.body;

    if (!name || !email || !phone)
      return (res.badRequest());

    await Company.update({ id: companyId }).set({ name: name, email: email, phone: phone});
    return res.ok();
  },

  delete: async function (req, res) {
    let companyId = req.param('id');

    await Company.destroy({ id: companyId });
    return res.ok()
  },


};
