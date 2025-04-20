//create an variable and import express
const express = require('express');

//initialize express
const app = express();

//listen port number
app.listen(3001, 'localhost', function(){
    console.log("Server is running on port 3001");
});