'use strict';
const usersRoute = require('./users');
const schoolsRoute = require('./schools');
const classesRoute = require('./classes');

module.exports = {
    userRoute: usersRoute,
    schoolRoute: schoolsRoute,
    classRoute: classesRoute
};