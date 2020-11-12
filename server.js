const express = require('express'),
    app = express(),
    cookieSession = require('cookie-session'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    cors = require('cors'),
    path = require('path');

const User = require('./models/user.model'),
    Comment = require('./models/comment.model'),
    Place = require('./models/place.model')

const authRoutes = require('./routes/auth.routes'),
    placeRoutes = require('./routes/places.routes');

// USING CORS
app.use(cors({ 
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//COOKIE SESSION
app.use(cookieSession({ 
    name: 'session',
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000,
}))

//PASSPORT CONFIG
app.use(passport.initialize()); 
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//MONGOOSE CONNECTION TO MONGODB
mongoose.connect(process.env.ATLAS_URI, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
});


//ROUTING
app.use(express.static('client/build'));

app.use('/api', authRoutes);
app.use('/api/places', placeRoutes);
//TEMPORARY FOR NAV
app.get('/api', (req, res) => {
    if (req.session.auth === true) {
        res.json({
            user: req.user.username,
            authenticated: req.session.authenticated
        })
    }
})

//USE FOR PRODUCTION BUILD
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
});

//SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`SERVER CONNECTION ESTABLISHED. PORT ${port}.`)
})