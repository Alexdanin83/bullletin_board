const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created updated status title description photo price phone location')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});
// Dodanie post
router.post('/posts', async (req, res) => {
  try {
    console.log(req.body.email);
    console.log(req.body.title);
    console.log(req.body.status);
    console.log(req.body.description);
    console.log(req.body.created);
   

    const newPost = new Post(
      { author: req.body.email,
        created: req.body.created,
        status: req.body.status,
        title: req.body.title,
        updated: req.body.updated,
        description:  req.body.description,
      
       
      }
    );
    await newPost.save();
    res.json(newPost);

  } catch(err) {
    res.status(500).json(err);
  }
});
// modyfikacja post
router.put('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      for (const prop in req.body) {
        post[prop] = req.body[prop];
      }
      await post.save();
      res.json(post);
    } else res.status(404).json({ message: 'Not found...' });
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
