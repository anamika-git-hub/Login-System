const express = require('express');
const router = express.Router();

const credential = {
    email: 'anamika@gmail.com',
    password: 'anamika123'
}

//-----login user-------------//
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!req.session.user) {
        if (email === credential.email && password === credential.password) {
            req.session.user = email;
            res.redirect('/route/home');
        } else {
            let emailError = '';
            let passwordError = '';

            if (email !== credential.email) emailError = 'Invalid email';
            if (password !== credential.password) passwordError = 'Invalid password';

            res.render('login', {
                email,
                password: '',
                emailError,
                passwordError,
                message: ''
            });
        }
    } else {
        res.redirect('/');
    }
});

//------ Route for dashboard----------------//
router.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('home', { user: req.session.user });
    } else {
        res.render('login', { email: '', password: '', emailError: '', passwordError: '', message: '' });
    }
});

//---------- Route for logout--------------//
router.get('/logout', (req, res) => {
    req.session.user = null;
    req.session.logoutMessage = 'Logout successful'; 
    res.redirect('/route/logoutpage');
});


router.get('/logoutpage', (req, res) => {
    const message = req.session.logoutMessage; 
    req.session.logoutMessage = null; 
    res.render('login', { email: '', password: '', emailError: '', passwordError: '', message });
});

module.exports = router;
