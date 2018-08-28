const express = require('express');

const { AUTH0_DOMAIN,
        AUTH0_MANAGEMENT_CLIENT_ID,
        AUTH0_MANAGEMENT_CLIENT_SCERET 
      } = require('../config');
const { User } = require('../models/user');
const { checkJwt } = require('../middlewares/auth');

const router = express.Router();

router.post('/update', checkJwt, async function(req, res){

    const user = {
        user_id: req.user.sub,
        email: req.body.email
    }
      
    try {
        const user_db = await User.findOneAndUpdate(
          {user_id: user.user_id },
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
