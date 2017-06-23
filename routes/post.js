// routes/posts.js

var express = require("express");
var router = express.Router();
var Post  = require("../models/Post");
var multer = require('multer');
var upload = multer({dest:'./tmp/'});

// Index 
router.get("/", function(req, res){
    Post.find({})
        .sort("-createdAt")            
        .exec(function(err, posts){
        if(err) return res.json(err);
        res.render("posts/index", {posts:posts});
    });
});

// New
router.get("/new", function(req, res){
    res.render("posts/new");
});

// create
router.post("/", upload.array('UploadFile'), function(req, res){
    Post.create(req.body, function(err, post){
        if(err) return res.json(err);
        res.redirect("/posts");
    });

    var mode = req.param('mode');

    if(mode == 'add') {
        if (isSaved(upFile)) { // 파일이 제대로 업로드 되었는지 확인 후 디비에 저장시키게 됨
            addBoard(addNewTitle, addNewWriter, addNewContent, addNewPassword, upFile);
            res.redirect('/boards');
        } else {
          console.log("파일이 저장되지 않았습니다!");
        }
    }
});

// show
router.get("/:id", function(req, res){
    Post.findOne({_id:req.params.id}, function(err, post){
        if(err) return res.json(err);
        res.render("posts/show", {post:post});
    });
});

// edit
router.get("/:id/edit", function(req, res){
    Post.findOne({_id:req.params.id}, function(err, post){
        if(err) return res.json(err);
        res.render("posts/edit", {post:post});
    });
});

// update
router.put("/:id", function(req, res){
    req.body.updatedAt = Date.now(); // 2
    Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
        if(err) return res.json(err);
        res.redirect("/posts/"+req.params.id);
    });
});

// destroy
router.delete("/:id", function(req, res){
    Post.remove({_id:req.params.id}, function(err){
        if(err) return res.json(err);
        res.redirect("/posts");
    });
});

module.exports = router;