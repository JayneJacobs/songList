var mongoose = require("mongoose");
var Song = require("./models/song");
var Note = require("./models/note");




function removeDB(){
   //Remove all songs
   Song.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
        console.log("removed songs!");
        
        }
        });
    //add a few notes
}

module.exports = removeDB;

