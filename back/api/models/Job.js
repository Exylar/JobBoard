module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true,
      columnType: 'varchar (4000)' 
    },
    wages: {
      type: 'number',
      required: true,
    },
    working_time: {
      type: 'number',
      required: true,
    },
    contract: {
      type: 'string',
      required: true,
    },
    city: {
      type: 'string',
      required: true,
    },
    country: {
      type: 'string',
      required: true,
    },
    apply: {
      collection: 'apply',
      via: 'id_job'
    },
    id_company: {
      model: 'company'
    }
  },
};