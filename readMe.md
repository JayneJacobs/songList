Yelp Song List
*Add a Song List that lists Band Songs
*Add a Landing Page

Each Song has:
         * A Name
         * A You Tube Link
         * A Music Sheet
         
         * as an array [
           { name:"name",
            link:"http://mylink.com",
            music: "http://linkToMusic.com"
            index: 0   
           },
            
            { name:"name",
            link:"http://mylink.com",
            music: "http://linkToMusic.com"
            index: 0    
           },
            { name:"name",
            link:"http://mylink.com",
            music: "http://linkToMusic.com"
            index: 0    
           },
            { name:"name",
            link:"http://mylink.com",
            music: "http://linkToMusic.com"
            index: 0    
           }
         ]
         
         * Example 
         songs[{
         name: "Girls Just want to have fun",
         link: "https://www.youtube.com/watch?v=PIb6AZdTr-A",
         music: "https://drive.google.com/file/d/1FrluKZhsiIQbWQILkLZUERdXlGEANP_4/view?usp=sharing",
         index: 120 
         
         },
         ]
         
         #Added Styles using Bootstrap
         
         
         #Setting up mongo a non-relational database
              allows objects to be defined by key-value pairs
           #   MEAN stack
              Mongo Express Angular and Node
              
              
         #The most popular noSql db.
         #CRUD
          Create Reatrieeve Update Destry
          
          
          #Add Mongoose
          * Install and configure mongoose
          * Setup song model
          * Use Songs model in routes
          
          # Restful Routes
          
          name      url     verb    desc.
         =====================================================
          Index   /songs     GET    Display a list of all songs
          New     /songs/new GET    Display form to add dog
          CREATE  /songs     POST   Add new song
          SHOW    /songs/:id GET    shows info about one song
          
          