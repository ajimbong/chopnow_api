const express = require('express')
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()

app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.set('view engine', 'ejs');
const port = process.env.PORT || 2022;

mongoose.connect(process.env.DB_URL)
.then(()=> {
    app.get('/', (req,res) => {
        res.render('index');
    })
    
    app.use('/meals', mealRoutes)
    
    app.listen(port, e => console.log("server started🔥🔥🚀🔥🔥"))
}).catch(err => console.log('err:', err))

//import routes
const mealRoutes = require("./src/routes/meals")
