'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/react-universal';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
exports.PORT = process.env.PORT || 8080;

exports.AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
exports.AUTH0_API_AUDIENCE = process.env.AUTH0_API_AUDIENCE;