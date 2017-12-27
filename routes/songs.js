var express = require("express");
var router  = express.Router();
var Song = require("../models/song");
var middleware = require("../middleware");


//INDEX - show all songs
router.get("/",  middleware.isLoggedIn, function(req, res){
    // Get all songs from DB
    Song.find({}, function(err, allSongs){
       if(err){
           console.log(err);
       } else {
          res.render("songs/index",{songs:allSongs});
       }
    });
});

//CREATE - add new song to DB
 router.post("/", middleware.isLoggedIn,  function(req, res) {
    
    var name = req.body.name;
    var link = req.body.link;
    var music = req.body.music;
    var index = req.body.index;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    var newSong = {name: name, link: link, music: music, index: index, author:author};
      
  Song.create(newSong, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to songs page
            console.log(newlyCreated);
            res.redirect("/songs");
        }
    });
});
  
//NEW - show form to create new song
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("songs/new"); 
});

// SHOW - shows more info about one song
router.get("/:id", middleware.isLoggedIn, function(req, res){
    //find the song with provided ID
    Song.findById(req.params.id).populate("notes").exec(function(err, foundSong){
        if(err){
            console.log(err);
        } else {
            console.log(foundSong)
            //render show template with that song
            res.render("songs/show", {song: foundSong});
        }
    });
});

// EDIT SONG ROUTE
router.get("/:id/edit", middleware.checkSongOwnership, function(req, res){
    Song.findById(req.params.id, function(err, foundSong){
        res.render("songs/edit", {song: foundSong});
    });
});

// UPDATE SONG ROUTE
router.put("/:id",middleware.checkSongOwnership, function(req, res){
  
    Song.findByIdAndUpdate(req.params.id, req.body.song, function(err, updatedSong){
       if(err){
           res.redirect("/songs");
       } else {
           //redirect somewhere(show page)
           res.redirect("/songs/" + req.params.id);
       }
    });
});

// DESTROY SONG ROUTE
router.delete("/:id",middleware.checkSongOwnership, function(req, res){
   Song.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/songs");
      } else {
          res.redirect("/songs");
      }
   });
});


module.exports = router;
