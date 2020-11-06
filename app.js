const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const covidRoutes = require('./routes/covid');
const twitterRoutes = require('./routes/twitter');

app.use('/covid/country', covidRoutes);
app.use('/twitter', twitterRoutes);
app.use('/',(req, res, next)=>{
    res.status(400).send({message:'Bad Request'});
})

app.listen(process.env.PORT||3000, ()=> {
    console.log('listening to 3000');
})