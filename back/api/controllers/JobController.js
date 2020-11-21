module.exports = {
  getAll: async function (req, res) {
    let jobs = await Job.find().populate('id_company').sort('id DESC');

    return res.status(200).json(jobs);
  },

  get: async function (req, res) {
    let job = await Job.find({ id: req.param('id') });

    return res.status(200).json(job);
  },

  getLast: async function (req, res) {
    let job = await Job.find({ id: req.param('id') }).limit(4).sort('id DESC');

    return res.status(200).json(job);
  },

  create: async function (req, res) {
    const { name, description, wages, working_time, contract, city, country} = req.body;

    if (!name || !description || !wages || !working_time || !contract || !city || !country)
      return (res.badRequest());

    await Job.create({ name, description, wages, working_time, contract, city, country, id_company: req.company.id });
    return res.ok();
  },

  update: async function (req, res) {
    let jobId = req.param('id');
    const { name, description, wages, working_time, contract, city, country, id_company } = req.body;

    if (!name || !description || !wages || !working_time || !contract || !city || !country || !id_company)
      return (res.badRequest());

    await Job.update({ id: jobId }).set({ name: name, description: description, wages: wages, contract: contract, city: city, country: country, working_time: working_time});
    return res.ok();
  },

  delete: async function (req, res) {
    let jobId = req.param('id');

    await Job.destroy({ id: jobId });
    return res.ok()
  },
};