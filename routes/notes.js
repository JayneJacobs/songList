var express = require("express");
var router  = express.Router({mergeParams: true});
var Song = require("../models/song");
var Note = require("../models/note");
var middleware = require("../middleware");

//Notes New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find song by id
    console.log(req.params.id);
    Song.findById(req.params.id, function(err, song){
        if(err){
            console.log(err);
        } else {
             res.render("notes/new", {song: song});
        }
    })
});

//Notes Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup song using ID
   Song.findById(req.params.id, function(err, song){
       if(err){
           console.log(err);
           res.redirect("/songs");
       } else {
        Note.create(req.body.note, function(err, note){
           if(err){
               req.flash("error", "Something went wrong");
               console.log(err);
           } else {
               //add username and id to note
               note.author.id = req.user._id;
               note.author.username = req.user.username;
               //save note
               note.save();
               song.notes.push(note);
               song.save();
               console.log(note);
               req.flash("success", "Successfully added note");
               res.redirect('/songs/' + song._id);
           }
        });
       }
   });
});

// NOTE EDIT ROUTE
router.get("/:note_id/edit", middleware.checkNoteOwnership, function(req, res){
   Note.findById(req.params.note_id, function(err, foundNote){
      if(err){
          res.redirect("back");
      } else {
        res.render("notes/edit", {song_id: req.params.id, note: foundNote});
      }
   });
});

// NOTE UPDATE
router.put("/:note_id", middleware.checkNoteOwnership, function(req, res){
   Note.findByIdAndUpdate(req.params.note_id, req.body.note, function(err, updatedNote){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/songs/" + req.params.id );
      }
   });
});

// NOTE DESTROY ROUTE
router.delete("/:note_id", middleware.checkNoteOwnership, function(req, res){
    //findByIdAndRemove
    Note.findByIdAndRemove(req.params.note_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Note deleted");
           res.redirect("/songs/" + req.params.id);
       }
    });
});

module.exports = router;