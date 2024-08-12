const express = require('express')
const app = express()

const port = process.env.PORT || 3000


const path = require ("path")
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))
//     res.send("hello home page")
// } )
// app.get('/prices', (req,res) =>{
//     res.send("hello prices page")
// } )
// app.listen(port, ()=>{
//     console.log("app is listening on port 3000")
// })
//static path:
// const path = require("path")
// const x=(path.join(__dirname, '../public'))
// app.use(express.static(x))
// app.set('view engine','hbs');
// const viewsdirectory = path.join(_dirname,"../temp/views")
// app.set("views",viewsdirectory)
////////////////////////////////////
app.set('view engine', 'hbs');

 const viewsDirectory = path.join (__dirname , '../temp/views')
 app.set('views', viewsDirectory);

 // to read partials : 
 var hbs = require('hbs');
const partialsPath = path.join(__dirname , "../temp/partials")
hbs.registerPartials(partialsPath)


// Define routes
app.get('/', (req, res) => {
    res.render('index', {
        title: "HOME",
        desc: "This is the home page",
        cloudyimg: "images/cloudy.jpg",
        rainyimg: "images/rainy.jpg",
        snowyimg: "images/snowy.jpg",
        stormyimg: "images/stormy.jpg",
        sunnyimg: "images/sunny.jpg",
        partlycloudyimg: "images/partlycloudy.jpg"
    });
});

const geocode = require("../data/geocode");
const forecast = require("../data/forecast");

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: req.query.address,
                latitude: data.latitude,
                longitude: data.longitude
            });
        });
    });
});


/////////////////////////////////////////////////////////////////////////////

  app.get('*' , (req , res)=> {
     res.send('404 Page Not Founded')
  })

///////////////////////////////////////////////////////////////////////////
  

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)})