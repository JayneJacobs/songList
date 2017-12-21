var Song = require("../models/song");
var Note = require("../models/note");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkSongOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Song.findById(req.params.id, function(err, foundSong){
           if(err){
               req.flash("error", "Song not found");
               res.redirect("back");
           }  else {
               // does user own the song?
            if(foundSong.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkNoteOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Note.findById(req.params.note_id, function(err, foundNote){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the note?
            if(foundNote.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;