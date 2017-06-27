var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('index')
});
router.get('/index',function(req,res){
    res.render('index')
});


router.get('/profile',function(req,res){
     res.render('profile')
});

router.get('/study',function(req,res){
     res.render('study')
});

module.exports = router;
