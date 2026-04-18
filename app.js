if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
console.log(process.env.SECRET);


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8080;

// const MONGO_URI = 'mongodb://127.0.0.1:27017/wanderlust';
const MONGO_URI = process.env.ATLAS_URI;

const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');

const listingRouter = require('./routes/listing.js')
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js'); 

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
//-- Middleware----
app.use(express.json());          
app.use(express.urlencoded({ extended: true })); 

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));



const store = MongoStore.create({
    mongoUrl: MONGO_URI,
    crypto:{
        secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 60 * 60,
}); 


store.on("error", function(e){
    console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


//-- Connect to MongoDB----
main().then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));
async function main(){
    await mongoose.connect(MONGO_URI);
}


//-- Routes----
// app.get('/', (req, res) => {
//   res.send('Hello root!');
// });

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// passport.use(new LocalStrategy({
//     usernameField: 'email'   // 👈 ye add kar
// }, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currUser = req.user;
  next();
});
 
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});




// app.get("/demoUser", async (req, res) => {
//     let fakeUser = new User({
//         email: 'demo@example.com',
//         username: 'demoUser'
//     });
//     let registeredUser = await User.register(fakeUser, 'demopassword');
//     res.send(registeredUser);
// });





























app.use('/listings',listingRouter);

app.use('/listings/:id/review',reviewRouter);

app.use('/',userRouter);


//-- Error handling middleware----
app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err,req,res,next)=>{
    let {statusCode = 500} = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!';
    // res.status(statusCode).send(err.message);

    res.render('listings/error.ejs',{err});
    
    // console.log(err);
    
    
});
//-- Start the server----
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});