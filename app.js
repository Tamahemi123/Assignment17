const express=require("express");
const router=require("./src/routes/api");
const app=new express();

// Import Mongoose models
const User = require('./models/User');
const Product = require('./models/Product');
const CartItem = require('./models/CartItem');
const Order = require('./models/Order');






const rateLimit=require("express-rate-limit");
const helmet=require("helmet");
const mongoSanitize=require("express-mongo-sanitize");
const xss=require("xss-clean");
const hpp=require("hpp");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const mongoose=require("mongoose");
const path=require("path");


let URL="mongodb+srv://<username>:<d>@cluster0.7uslu.mongodb.net/MernEcommerce?retryWrites=true&W=majority";
let option={user:"testuser7777",pass:"testuser7777",autoIndex:true};
mongoose.connect(URL,option).then((res)=>{
    console.log("Database Connected")

}).catch((err)=>{
    console.log(err)
})




app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(express.json({Limit:'50mb'}));
app.use(express.urlencoded({Limit:"50mb"}));


const limiter=rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)


app.use("/api/v1,router")

app.use(express.static("client/dist"));



app.get("*",function(req,res){
    res.sendFile(path.resolve(--dirname,'client','dist','index.html'))

})

module.exports=app;