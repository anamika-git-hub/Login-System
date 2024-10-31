const express = require('express');
const router = express.Router();

const credential = {
    email:'anamika@gmail.com',
    password:'anamika123'
}

//-----login user

router.post('/login',(req,res)=>{
    const { email, password } = req.body;
    if(!req.session.user){
    if(req.body.email==credential.email&&req.body.password==credential.password){
      req.session.user= email;
      res.redirect('/route/home')
    }else if(email!==credential.email&&password==credential.password){
        res.render('login',{message:'Invalid username', email, password: ''})
    }else if(email==credential.email&&password!==credential.password){
        res.render('login',{message:'Invalid password', email, password: ''})
    }else if(email!==credential.email&&password!==credential.password){
        res.render('login',{message:'Invalid username and password', email, password: ''})
    }
}else{
    res.redirect('/');
}
});

//route for dashboard

router.get('/home',(req,res)=>{
    if(req.session.user){
        res.render('home',{user:req.session.user})
    }else{
        res.render('login');
    }
})

//route for logout

router.get('/logout',(req,res)=>{
    req.session.user=null
    res.redirect('/route/logoutpage')
})
router.get('/logoutpage',(req,res)=>{
    if(req.session.user){
        res.redirect('/')
    }else{
        const logout='Logout Successfully'
        res.render('login',{ email: '', password: '', message: '' })
    }
})
module.exports=router;