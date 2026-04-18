const User = require('../models/user.js');

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup");
}

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }]
    });

    if (existingUser) {
      req.flash("error", "Username ya Email already exists!");
      return res.redirect("/signup");
    }

    // Agar unique hai toh register karo
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if(err){
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    // This callback is optional and can be used for additional processing after authentication
    // For example, you can log the user in or perform other actions here
    req.flash('success', 'Welcome back!');
    res.redirect(res.locals.redirectTo || '/listings');

}

module.exports.logout = (req, res,next) => {
    req.logout((err)=> {
        if (err) { 
          return next(err);
        }
        req.flash('success', 'You have logged out successfully!');
        res.redirect('/listings');
    });
}