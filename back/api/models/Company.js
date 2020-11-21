module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
    },
    phone: {
      type: 'number',
    },
    job: {
      collection: 'job',
      via: 'id_company'
    },
  },
};