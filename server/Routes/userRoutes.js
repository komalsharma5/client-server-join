const express = require('express');
const router = express.Router();
const { register_user, login_User, authMiddlewere } = require('../Controller/userController');


router.post('/signup', register_user);
router.post('/login', login_User);
router.get('/check-auth', authMiddlewere, (req, res) => {
   const user = req.user;
    res.status(200).json({
        success : true,
        message : 'Authenticated User!!!',
        user : user
    })
})


module.exports = router;