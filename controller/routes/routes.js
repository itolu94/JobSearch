const path = require('path');
const helpers =  require('./../passportHelper');

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
	  if(req.user) {
		  res.sendFile(path.resolve(__dirname + './../../public/app.html'));
	  } else {	
	  res.sendFile(path.resolve(__dirname + './../../public/login.html'));
	  }
  });

  app.post('/login',
    passport.authenticate('signin', {
      failureRedirect: '/',
    }),
    (req, res) => {
      return res.redirect('/');
  });
	
  app.get('/signup', (req, res) => {
	  res.sendFile(path.resolve(__dirname + './../../public/signup.html'));
  });

  app.post('/signup', (req, res) => {
    // console.log(req.body);
    helpers.createAccount(req.body, (err) => {
      if (err){ 
        console.log(err);
        res.redirect('/signup');        
      }else{
        res.redirect('/'); 
      }
    });
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
}