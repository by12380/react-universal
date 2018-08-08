const express = require('express');
const fetch = require('node-fetch');

const { AUTH0_DOMAIN, AUTH0_MANAGEMENT_CLIENT_ID, AUTH0_MANAGEMENT_CLIENT_SCERET } = require('../config');
const { User } = require('../models/user');

const router = express.Router();

router.post('/profile/update-with-auth0', async function(req, res){

    if (!req.body.user_id) {
        res.status(400).json({ error: 'Auth0 user id is required'});
    }

    try {
      const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: AUTH0_MANAGEMENT_CLIENT_ID,
          client_secret: AUTH0_MANAGEMENT_CLIENT_SCERET,
          audience: `https://${AUTH0_DOMAIN}/api/v2/`
        })
      })

      if (response.status !== 200)
        throw { error: `Failed to fetch access token with status code: ${response.status}`};

      const responseJson = await response.json();

      const result = await fetch(`https://${AUTH0_DOMAIN}/api/v2/users/${req.body.user_id}`, {
          headers: { authorization: `${responseJson.token_type} ${responseJson.access_token}`}
      })

      if (response.status !== 200)
        throw { error: `Failed to fetch user profile with status code: ${response.status}`};

      const resultJson = await result.json();

      const user = {
          user_id: resultJson.user_id,
          email: resultJson.email
      }

      const user_db = await User.findOneAndUpdate(
        {user_id: resultJson.user_id },
        user,
        {upsert: true},
        function(err){
          if (err){
            console.log(err);
          }
        }
      );

      res.status(200).json(user_db);
    }
    catch(e)
    {
      console.error(e);
      res.status(500).json('Internal server error.');
    }
})

module.exports = router;
