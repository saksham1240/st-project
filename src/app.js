const express = require("express");
const path = require("path");
const app = express();
const mongoose= require('mongoose');
const templates_path = path.join(_dirname, '../templates/views');
const empCollection = require('./model/model');

require('./db/db');

app.set('view engine', 'hbs');
app.set('views', templates_path);

app.use(express.urlencoded({extended : false}));

app.get('/', (req, res) =>{
    res.render('index');
})

app.post('/empdata', async (req,res) => {
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if (password === cpassword){
        const empData = new empCollection({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            password : req.body.password,
            cpassword : req.body.cpassword,
        });

        const postData = await empData.save();
        res.send(postData);
    }else{
        res.send("password are not matching..")
    }
})

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})