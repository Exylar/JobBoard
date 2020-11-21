module.exports = {
  get: async function (req, res) {
    let applicationId = await Apply.find({ id: req.param('id') });

    return res.status(200).json(applicationId);
  },

  getOne: async function (req, res) {
    let Application = await Apply.find({ id_job: req.param('id_job'), id_user: req.param('id_user') });

    return res.status(200).json(Application);
  },

  create: async function (req, res) {
    const { id_job, id_user, description } = req.body;

    if (!id_job || !id_user)
      return (res.badRequest());

    await Apply.create({ id_job, id_user, description });
    return res.ok();
  },

  update: async function (req, res) {
    let applicationId = req.param('id');
    const { id_job, id_user } = req.body;

    if (!id_job || !id_user)
      return (res.badRequest());

    await Apply.update({ id: applicationId }).set({ id_job: id_job, id_user: id_user });
    return res.ok();
  },

  delete: async function (req, res) {
    let id = req.param('id');

    await Apply.destroy({ id_job: id });
    return res.ok()
  },
};
