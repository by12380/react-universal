'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/react-universal';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
exports.PORT = process.env.PORT || 8080;

exports.AUTH0_DOMAIN = 'react-universal.auth0.com';

//Server-side auth0 config
exports.AUTH0_MANAGEMENT_CLIENT_ID = 'tWKVHv421JepBXvs5eZe3sQVrTgMlEjv';
exports.AUTH0_MANAGEMENT_CLIENT_SCERET = 'SnX0esC0JaoG02JCZFN5QcOtKRQFQp_7S17aux0blrhkPrP3eF27nKXqJdNBk6Tn';