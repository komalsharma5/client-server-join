const express = require('express');
const router = express.Router();
const { register_user, login_User, authMiddlewere, getUser_Controller, updateUser_controller, deleteUser_Controller, logout_controller } = require('../Controller/userController');


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
router.get('/allusers', getUser_Controller);
router.put("/updateuser/:id", updateUser_controller);
router.delete('/deleteuser/:id', deleteUser_Controller);
router.get('/logout', logout_controller);

module.exports = router;