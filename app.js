var express   = require("express"),
  mongoose    = require("mongoose"),
  app         = express(),
  bodyParser  = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");   
mongoose.connect("mongodb://localhost/songs_list");


var songSchema = new mongoose.Schema({
    name: String,
    link: String,
    music: String,
    index: Number
});
//Index  /songs    GET    Display a list of all songs
var Song = mongoose.model("Song", songSchema);
//Schema
// Song.create(
//           {
//             name: "Somebody that I Used to Know",
//             link: "https://youtu.be/DqRC5tquyU0",
//             music: "https://docs.google.com/document/d/1k-M7YrSOcPEZZ8IFsORFLUt9Y7tV9xUBNOw58pByGe4/edit?usp=sharing",
//             index: 122
//          }, function (err, song) {
//              if(err){
//                  console.log("Failed to create song");
                 
//              }else{
//              console.log("Success, created:");
//              console.log(song);
//              }
         
//     });


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/songs", function(req, res){
    
    Song.find({}, function (err, allSongs) {
        
        if(err){
                 console.log("Failed to retrieve Songs");
                 
             } else {
                console.log("Success, created:");
                res.render("index",{songs:allSongs});
             }
        });
    });
    
//CREATE  /songs    POST  Add new song
app.post("/songs", function(req, res) {
    
    var name = req.body.name;
    var link = req.body.link;
    var music = req.body.music;
    var index = req.body.index;
    var newSong = {name: name, link: link, music: music, index: index};
      console.log("inPost");
    Song.create(newSong, function (err, newlyCreated) {
        if(err){
                 console.log(err);
                 
             } else {
                console.log(newSong);
                res.redirect("/songs");
             }
        });
    });
  
    // songs.push(newSong);
    //redirect back to campgrounds page. 
    
// New    /songs/new GET    Display form to add dog

app.get("/songs/new", function(req, res) {
    res.render("new.ejs");
});

//  SHOW    /songs/:id GET    shows info about one song

app.get("/songs/:id", function(req, res) {
    Song.findById(req.params.id, function (err, foundSong) {
        if(err){
            console.log(err);
            
        } else {
            res.render("show", {song: foundSong});
        
         
        }
    });
});    

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("In the Song List App");
});

