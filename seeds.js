var mongoose = require("mongoose");
var Song = require("./models/song");
var Note = require("./models/note");

var data = [
        
             {
            name: "Somebody that I Used to Know",
            link: "https://youtu.be/DqRC5tquyU0",
            music: "https://docs.google.com/document/d/1k-M7YrSOcPEZZ8IFsORFLUt9Y7tV9xUBNOw58pByGe4/edit?usp=sharing",
            // notes: "capo2 start guitar, light drums",
            index: 122
         },
         {
            name: "Somebody that I Used to Love",
            link: "https://youtu.be/DqRC5tqkj",
            music: "https://docs.google.com/document/d/1k-M7YrSOcPEZZ8IFsORFLUt9Y7tV9xUBNOw58pByGe4/edit?usp=sharing",
            // notes: "Key of A, start guitar, Vocal STarts",
            index: 123
         }
            
        
    ]


function seedDB(){
   //Remove all songs
   Song.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed songs!");
         //add a few songs
        data.forEach(function(seed){
            Song.create(seed, function(err, song){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a song");
                    //create a note
                    Note.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, note){
                            if(err){
                                console.log(err);
                            } else {
                                song.notes.push(note);
                                song.save();
                                console.log("Created new note");
                            }
                        });
                }
            });
        });
    }); 
    //add a few notes
}

module.exports = seedDB;
