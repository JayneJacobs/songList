var express = require("express");

var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");   

var songs = [{
         name: "Girls Just want to have fun",
         link: "https://www.youtube.com/watch?v=PIb6AZdTr-A",
         music: "https://drive.google.com/file/d/1FrluKZhsiIQbWQILkLZUERdXlGEANP_4/view?usp=sharing",
         
         },
         {
         name: "Somebody that I Used to Know",
         link: "https://youtu.be/DqRC5tquyU0",
         music: "https://docs.google.com/document/d/1k-M7YrSOcPEZZ8IFsORFLUt9Y7tV9xUBNOw58pByGe4/edit?usp=sharing",
         
         },{
         name: "Girls Just want to have fun",
         link: "https://www.youtube.com/watch?v=PIb6AZdTr-A",
         music: "https://drive.google.com/file/d/1FrluKZhsiIQbWQILkLZUERdXlGEANP_4/view?usp=sharing",
         
         },
         {
         name: "Somebody that I Used to Know",
         link: "https://youtu.be/DqRC5tquyU0",
         music: "https://docs.google.com/document/d/1k-M7YrSOcPEZZ8IFsORFLUt9Y7tV9xUBNOw58pByGe4/edit?usp=sharing",
         
         },{
         name: "Girls Just want to have fun",
         link: "https://www.youtube.com/watch?v=PIb6AZdTr-A",
         music: "https://drive.google.com/file/d/1FrluKZhsiIQbWQILkLZUERdXlGEANP_4/view?usp=sharing",
         
         },
         {
         name: "Somebody that I Used to Know",
         link: "https://youtu.be/DqRC5tquyU0",
         music: "https://docs.google.com/document/d/1k-M7YrSOcPEZZ8IFsORFLUt9Y7tV9xUBNOw58pByGe4/edit?usp=sharing",
         
         },{
         name: "Girls Just want to have fun",
         link: "https://www.youtube.com/watch?v=PIb6AZdTr-A",
         music: "https://drive.google.com/file/d/1FrluKZhsiIQbWQILkLZUERdXlGEANP_4/view?usp=sharing",
         
         },
         {
         name: "Somebody that I Used to Know",
         link: "https://youtu.be/DqRC5tquyU0",
         music: "https://docs.google.com/document/d/1k-M7YrSOcPEZZ8IFsORFLUt9Y7tV9xUBNOw58pByGe4/edit?usp=sharing",
         
         },{
         name: "Its Too Late",
         link: "https://drive.google.com/open?id=0B6cRrh-wbj88VEtDb1Jxc3hiY28",
         music: "https://drive.google.com/file/d/0B6cRrh-wbj88bmlYcEI5a3N5Wm8/view?usp=sharing",
        }
         ];
         
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/songs", function(req, res){
    res.render("songs",{songs, songs});

});

app.post("/songs", function(req, res) {
    
    var name = req.body.name;
    var link = req.body.link;
    var music = req.body.music;
    var newSong = {name: name, link: link, music: music};
    console.log("inPost");
    songs.push(newSong);
    //redirect back to campgrounds page. 
    res.redirect("/songs");
} );

app.get("/songs/new", function(req, res) {
    res.render("new.ejs");
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("In the Song List App");
});
