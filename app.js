const express = require('express')
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
app.use(cors({ origin : "*"}))

app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL)
.then(()=> {
    app.get('/', (req,res) => {
        res.render('index');
    })
    
    app.use('/meals', mealRoutes)
    app.use('/user', userRoutes)
    
    app.listen(port, e => console.log(`server started 🚀🔥🔥 on ${port}`))
}).catch(err => console.log('err:', err))

//import routes
const mealRoutes = require("./src/routes/meals")
const userRoutes = require("./src/routes/user")
