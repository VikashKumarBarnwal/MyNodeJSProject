const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()

// Define path for Express Config
var publicDirPath = path.join(__dirname , '../public')
var viewsPath = path.join(__dirname , '../templates/views')
var partialsPath = path.join(__dirname , '../templates/partials')


// Setup handlebar Engine and views loctions
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static  directory to serve static pages.
app.use(express.static(publicDirPath))


app.get('/about', (req , res) => {
  res.render('about', {
    title:'About',
     name:'Vikash'})
} );

app.get('/help', (req , res) => {
  res.render('help', {
    title:'Help',
     name:'Vikash'})
} );

app.get('/weatherPage', (req , res) => {
  res.render('weather', {
    title:'Weather',
     name:'Vikash'})
} );


app.get('/weather', (req , res) => {
  if(!req.query.address){
    console.log('Please provide serch criteria');
    return res.send({error: 'you must provide and address !!'})
  }

  const placeName=req.query.address;

  geocode(placeName, (error , {latitude, longitude, location}={})=>{
    if (error){
      return res.send({error})
    }
    forecast(latitude , longitude , (error, forcastdata)=>{
      if (error){
        return res.send({error})
      }
      res.send({
        forecast:forcastdata,
        location:location,
        address:placeName
      })
    })
  })
} );

app.get('/products', (req , res) => {

  if(!req.query.search){
    console.log('Please provide serch criteria');
    return res.send({error: 'you must provide search'})
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
})

app.get('/help/*', (req , res) => {
  res.send('<h1>No Help Article found</h1>');
  res.end();
} );


app.get('*', (req , res) => {
  res.render('404', {
    title:'Page Not found(404)',
     name:'Vikash',
     errorMessage: 'Help article not found.'
   })
} );


app.listen(3000 , () => {
  console.log("Webserver started ... listining on port number =3000");
});
