//abby
require('dotenv').config();
const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");

});

app.post("/", function(req,res){
    var fn= req.body.fname;
    var ln=req.body.lname;
    var em=req.body.email;

    var data={
        members: [
            {
                email_address: em,
                status:"subscribed",
                merge_fields:{
                    FNAME: fn,
                    LNAME: ln
                } 
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    var options={
        url:"https://us20.api.mailchimp.com/3.0/lists/44b7b331a0",
        method: "POST",
        headers:{
            "Authorization": "abhishek "+process.env.API_KEY 
        },
        body: jsonData
    };
    request(options, function(error,response,body){
        if (error) {
            res.sendFile(__dirname+"/failure.html");
            console.log(error);
        }
        else{
            if(response.statusCode===200){
                res.sendFile(__dirname+"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }
        }
    });
});

app.post("/failure", function(req,res){
    res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000.")
    // console.log(typeof(process.env.API_KEY) );
    // console.log("TESTING" );

});
//api key
//0849977a4e0de8bc87f3c00b85141037-us20
//list id
//44b7b331a0
//7b80f67abc