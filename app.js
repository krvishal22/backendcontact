require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

//my routes
const userRoutes = require("./routes/user");

// DB Connection
mongoose
    .connect("mongodb+srv://vishal:vishal@cluster0-wfuul.mongodb.net/test?retryWrites=true&w=majority",{ // env storing the address where it is running
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {               //then portion run when there is a success
        console.log("DB CONNECTED");
});
    
// Middlewares ( pre-defined middleware which we want to use)
 app.use(bodyParser.json()); // handle the value it takes from the frontend
 app.use(cors());          // link our backend and frontend cross-origin resource sharing

// My Routes, middleware to handle it

app.use("/api", userRoutes);



// PORT
const port = process.env.PORT || 8000;

// Starting as SERVER
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});