const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const nocache = require('nocache')
const {v4:uuidv4} = require('uuid')
const router = require('./router.js');


dotenv.config()
const app = express()
const port = process.env.PORT || 4001

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(nocache());

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));
app.use('/route',router);

app.get('/',(req,res)=>{
    if(req.session.user){
        res.render('home',{user:req.session.user})
    }else{
        res.render('login',{ email: '', password: '', message: '' })
    }
})

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
    
})