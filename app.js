const express=require('express');
const app=express();
let bodyParser = require("body-parser");
let mongoose=require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport=require('passport');
const Tour =require('./models/Tour');
const NewsLetter=require('./models/newsLetter')
const User=require('./models/Users')

const path = require('path');
const router = express.Router();

//passport config
require('./config/passport')(passport);

mongoose.set('useCreateIndex', true);

app.use(express.static('assets'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// BodyParser
app.use(express.urlencoded({extended: false }));

//express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// EJS
// app.use(expressLayouts);     afto edw to steneve
app.set("view engine","ejs");

// Routes
app.use('/users', require('./routes/users'));

// db confing
var connectDB = require('./config/keys');

// Connect to Mongo
connectDB().then(()=>{
  console.log("Connected")
});






app.get("/",function(req,res){
  res.render("home",{currentuser:req.user});
});

app.get("/home",function(req,res){
  res.render("home",{currentuser:req.user});
});

app.get("/biography",function(req,res){
  res.render("biography",{currentuser:req.user});
});

app.get("/newsletter",function(req,res){
  res.render("newsletter",{currentuser:req.user});
});

app.get('/login',(req, res) =>{
  res.render('login');
});

app.get('/register',(req, res) =>{
  res.render('register');
});

app.get('/logout', async (req, res)=>{
    req.logout();
    res.redirect('/');
});

app.get("/noise-pageant-tour",async(req,res)=>{
  var user=""
  if(isLogged(req,res,req.user)){
        user = await User.findOne(req.user);
  console.log(user)
}
  var tours= ""
  await Tour.find({},(err,found)=>{
    if(err){
      console.log(err);
    }else{
      tours=found
    }
  })
res.render("noise-pageant-tour",{tours:tours,currentuser:user})
});

app.post("/tours",async(req,res)=>{
  let newTour = await Tour({date:req.body.date,location:req.body.location,venue:req.body.venue});
  await newTour.save();
  console.log(newTour);
  res.redirect('/noise-pageant-tour');
});
app.post("/tour-delete/:id",async(req,res)=>{
  _id=req.params.id
  console.log("HI")
    await Tour.findOneAndRemove({_id:req.params.id},(err,found)=>{
      if(err){
        console.log(err)
      }else{
        console.log("Done")
      }
    })
  res.redirect('/noise-pageant-tour');
});
app.post('/newsletter',async function(req,res){
    var letter=await new NewsLetter({name:req.body.name,email:req.body.email,message:req.body.message});
    await letter.save();
    console.log(letter);
   res.redirect('/home')
});
app.post('/',async function(req,res){
  var letter=await new NewsLetter({name:req.body.name,email:req.body.email,message:req.body.message});
  await letter.save();
  console.log(letter);
 res.redirect('/home')
});
app.post('/biography',async function(req,res){
  var letter=await new NewsLetter({name:req.body.name,email:req.body.email,message:req.body.message});
  await letter.save();
  console.log(letter);
 res.redirect('/home')
});



function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
function isLogged(req,res,user){
  if(req.isAuthenticated()){
    return true;
  }
}
function issuper(req,res,next){
  if(req.isAuthenticated()&&req.user.isSuper){
    return next();
  }
  res.redirect('/');
}










const port = process.env.PORT||####;
app.listen(port,()=>{
  console.log("Server running at localhost:"+port);
});
