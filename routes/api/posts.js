const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const passport = require('passport');
const ValidatePostInput = require('../../validation/post');

// passport.authenticate('jwt', {session: false});
router.get('/', passport.authenticate("jwt", {session: false}), (req, res) => {
    Post.find({author: req.user.user_name}).then((posts) => {
        return res.status(200).json(posts);
    }).catch(err => {
        return res.status(400).json({user : "Error fetching posts"});
    });
});

router.get('/post/:id', (req, res) => {
    Post.find({_id : req.params.id}).then((post) => {
        return res.status(200).json(post);
    }).catch((err) => {
        return res.status(400).json({id : "Error fetching post"});
    });
});

router.get("/author/:author", (req, res) => {
    Post.find({author : req.params.author}).then((posts) => {
        return res.status(200).json(posts);
    }).catch((err) => {
        return res.status(400).json({author : "Error fetching posts"});
    });
});

router.post('/create', passport.authenticate("jwt", {session : false}), (req, res) => {
    const author = req.user.user_name;
    const post = req.body;
    const {errors, isValid} = validatePostInput(post);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    post.author = author;
    const newPost = new Post(post);
    newPost.save().then(doc => {
        return res.json(doc);
    }).catch((err) => {
        console.log({create : `${err}`});
    });
});

router.patch('/update/:id', passport.authenticate("jwt", {session: false}), (req, res) => {
    const author = req.user.user_name;
    const {errors, isValid} = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const {title, body} = req.body;
    Post.findOneAndUpdate(
        {author, _id: req.params.id},
        {$set: {title, body}},
        {new : true},
    ).then((doc) => {
        return res.status(200).json(doc);
    }).catch((err) => {
        return res.status(400).json({update : `Error Update ${err}`});
    });
});

router.delete('/delete/:id', passport.authenticate("jwt", {session: false}), (req, res) => {
    const author = req.user.user_name;
    Post.findOneAndDelete(
        {author, _id: req.params.id}
    ).then((doc) => {
        return res.status(200).json(doc);
    }).catch((err) => {
        return res.status(400).json({delete: `Error Deletinh ${err}`});
    });
});

module.exports = router;