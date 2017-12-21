var express     = require("express"),
  app           = express(),
  mongoose      = require("mongoose"),
  bodyParser    = require("body-parser"),
  flash         = require("connect-flash"),
  Song          = require("./models/song"),
  Note          = require("./models/note"),
  passport      = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  User          = require("./models/user"),
  removeDB      = require("./remove"),
  seedDB        = require("./seeds");
  
  
var noteRoutes    = require("./routes/notes"),
    songRoutes = require("./routes/songs"),
    indexRoutes      = require("./routes/index"); 

var url = process.env.DATABASEURL || "mongodb://localhost/song_lists3";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");   
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// removeDB();
// seedDB();
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is our Song and here are the words!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Index  /songs    GET    Display a list of all songs
// var Song = mongoose.model("Song", songSchema);
//Schema
// Song.create(
//           {
//             name: "Somebody that I Used to Know",
//             link: "https://youtu.be/DqRC5tquyU0",
//             music: "https://docs.google.com/document/d/1k-M7YrSOcPEZZ8IFsORFLUt9Y7tV9xUBNOw58pByGe4/edit?usp=sharing",
//              note: "capo2 start guitar, light drums"
//              index: 122
//          }, function (err, song) {
//              if(err){
//                  console.log("Failed to create song");
                 
//              }else{
//              console.log("Success, created:");
//              console.log(song);
//              }
         
//     });

app.use(function(req, res, next){
     res.locals.currentUser = req.user;
     res.locals.error = req.flash("error");
     res.locals.success = req.flash("success");
     next();
});

app.use("/", indexRoutes);
app.use("/songs", songRoutes);
app.use("/songs/:id/notes", noteRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("In the Song List App");
});

