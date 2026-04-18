const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const passport = require('passport');
const { isLoggedIn, saveRedirectTo } = require('../middleware.js');
const wrapAsync = require('../utils/wrapAsync.js');
const userController = require('../controllers/user.js');



router.route('/signup')
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router.route('/login')
  .get(userController.renderLoginForm)
  .post(saveRedirectTo, passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
    }), userController.login);

router.get('/logout', userController.logout);

module.exports = router;





// router.get("/signup", userController.renderSignupForm);
// router.post("/signup", wrapAsync(userController.signup));
// router.get("/login",userController.renderLoginForm); 
// router.post('/login',saveRedirectTo,passport.authenticate('local', {
//     // successRedirect: '/listings',
//     failureRedirect: '/login',
//     failureFlash: true,
//     // successFlash: 'Welcome back!'
// }),userController.login);



// router.post("/signup", async (req, res) => {
//     let { username, email, password } = req.body;
//     try {
//         const existingUser = await User.findOne({
//             $or: [{ username: username }, { email: email }]
//         });

//     // const newUser = new User({ username, email });
//     // const registeredUser = await User.register(newUser, password);
//     // console.log(registeredUser);
//     // res.send(registeredUser);
// });
