//create an variable and import express
const express = require('express');

//import cloudDB(mongoose) 
const mongoose = require('mongoose');

//initialize express
const app = express();

//middleware for express
app.use(express.json());

//connect to the DB 
(async function connectDB(){
    const connection = await mongoose.connect('mongodb+srv://bkc17154:<password>@cluster0.1jcz0.mongodb.net/RESTfullAPI')
    console.log('mongoDB is connected')
})();

// create a schema
const userSchema = new mongoose.Schema({
    name: String,
    age : Number,
    number: Number
})
//model for the above schema
const User = new mongoose.model('User', userSchema);


//CRUD API's

//create a POST method-(use thunder client or postman to test the POST API http://localhost:3001/post with body -> raw -> json -> { "name": "bkc", "age": 23, "number": 1234567890 })
app.post('/post',async function(req, res){
    // console.log(req.body)
    await User.create(req.body)
    res.send('data stored in DB successfully')
})

//create a GET method-(use thunder client or postman to test the GET API http://localhost:3001/GET)
app.get('/get',async function (req, res){
    // res.send('hello world')
    const data = await User.find();
    res.send(data)
});

//crete a PUT method (update)-(use thunder client or postman to test the PUT API http://localhost:3001/PUT/(APKI-ID-JO-KI-APNE-GET-REQ-S-LI) with body -> raw -> json -> { "name": "bkcMKC", "age": 3, "number": 1101010100 })
app.put('/put/:id', async function(req, res){
    console.log(req.params)
    const user = await User.findByIdAndUpdate({_id : req.params.id}, req.body);
    console.log(user)
    res.send('data updated successfully in DB')
});

//create a delete method-(use thunder client or postman to test the DELETE API http://localhost:3001/DELETE/(APKI-ID-JO-KI-APNE-GET-REQ-S-LI))
app.delete('/delete/:id', async function(req, res){
    const user = await User.findByIdAndDelete({_id : req.params.id});
    res.send('data deleted successfully from db');
});

//listen port number
app.listen(3001, 'localhost', function(){
    console.log("Server is running on port 3001");
});