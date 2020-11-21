/**
 * Route Mappings
 * (sails.config.routes)
 */
var serveStatic = require('serve-static');
const dir = process.cwd();

module.exports.routes = {


  '/upload/*': serveStatic(dir, {skipAssets: false}),

// ------- JOBS -------- //

    'GET /jobs': {
        controller: 'JobController',
        action: 'getAll'
    },

    'GET /jobs/:id': {
        controller: 'JobController',
        action: 'get'
    },

    'GET /jobslast': {
        controller: 'JobController',
        action: 'getLast'
    },

    'POST /jobs': {
        controller: 'JobController',
        action: 'create'
    },

    'PUT /jobs/:id': {
        controller: 'JobController',
        action: 'update'
    },

    'DELETE /jobs/:id': {
        controller: 'JobController',
        action: 'delete'
    },

// ------- COMPANIES -------- //

    'GET /companies/:id': {
        controller: 'CompanyController',
        action: 'get'
    },

    'GET /companies/:id/jobs': {
        controller: 'CompanyController',
        action: 'getJobs'
    },

    'GET /companies/:id/applications': {
        controller: 'CompanyController',
        action: 'getApplications'
    },

    'POST /companies': {
        controller: 'CompanyController',
        action: 'create'
    },

    'PUT /companies/:id': {
        controller: 'CompanyController',
        action: 'update'
    },

    'DELETE /companies/:id': {
        controller: 'CompanyController',
        action: 'delete'
    },

// ------- Application -------- //

    'GET /apply/:id': {
        controller: 'ApplyController',
        action: 'get'
    },

    'GET /apply/:id_job/:id_user': {
        controller: 'ApplyController',
        action: 'getOne'
    },

    'POST /apply': {
        controller: 'ApplyController',
        action: 'create'
    },

    'PUT /apply/:id': {
        controller: 'ApplyController',
        action: 'update'
    },

    'DELETE /apply/:id': {
        controller: 'ApplyController',
        action: 'delete'
    },

    // ------- Users -------- //

    'GET /user/:id': {
        controller: 'UserController',
        action: 'get'
    },
    'POST /user/register': {
        controller: 'UserController',
        action: 'create'
    },
    'PUT /user/:id': {
        controller: 'UserController',
        action: 'update'
    },
    'POST /user/login': {
        controller: 'UserController',
        action: 'login'
    },
    'POST /user/verify': {
        controller: 'UserController',
        action: 'verify'
    }
};
