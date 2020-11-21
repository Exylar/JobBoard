'use strict';

const CompanyController = require("../controllers/CompanyController");

module.exports = async (req, res, next) => {
  let companyId = req.params['companyId'] || req.user.id_company;
  let entreprise = await Company.findOne(companyId);

  if (req.user.id_company != companyId)
    return (res.forbidden());
  req.company = entreprise;
  next();
}