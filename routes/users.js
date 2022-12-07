var express = require('express');
const { response } = require('../app');
var router = express.Router();
var MongoClient=require('mongodb').MongoClient
var details=require('../Register/Register')
const userHelpers=require("../Register/Register")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('userSignup');

});

router.get('/login', function(req, res, next) {
  res.render('userLogin');
});

router.get('/home', function(req, res, next) {
  var user=req.session.user
  console.log(user);
  res.render('userpage',{user});
});

router.post('/redirect', function(req, res, next) {
  userHelpers.doSignup(req.body)
  res.render('userSignup');

});

router.post('/login',(req, res)=> {
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.user=response.user
      res.redirect('/home')
    }else{
      res.redirect('/')
    }
  })
});

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/home')
})



module.exports = router;
