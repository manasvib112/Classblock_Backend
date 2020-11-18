const post = require('../models/Post')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const { findOneAndDelete, populate } = require('../models/Post')
const ObjectId = mongoose.Types.ObjectId
const comment = require('../models/Comment')

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newpost = new post({
      postedBy: req.user.id,
      content: req.body.content
    })
    newpost
      .save()
      .then((entry) => {
        if (entry) res.json(entry).status(200)
        res.json({ error: 'post was not created' }).status(401)
      })
      .catch((error) => {
        res.json(error).status(451)
      })
    //res.json({ msg: "add post works", user: req.user });
  }
)

//view all post
router.get(
  '/myposts',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.user)
    post
      .find({ postedBy: ObjectId(req.user.id) })
      .sort({ date_created: -1 })
      .populate({ path: 'likes', model: 'User', select: 'name' })
      .populate('postedBy', 'name role profile.branch uid')
      .then((mypost) => {
        res.json({ mypost })
      })
      .catch((err) => {
        console.log(err)
      })
  }
)

// Add comment
router.put(
  '/add-comment',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newComment = new comment({
      body: req.body.content,
      postedBy: req.user.id,
      userType: req.user.type
    })
    newComment
      .save()
      .then((result) => {
        console.log(result)
        post
          .findByIdAndUpdate(
            req.body.id,
            {
              $push: { comments: newComment }
            },
            {
              new: true
            }
          )
          .populate('comments')
          .then((result) => {
            res.json(result)
          })
          .catch((error) => {
            if (err) {
              console.log(err)
              return res.status(422).json({ error: err })
            }
          })
      })
      .catch((err) => {
        console.log(err)
        res.status(422).json({ error: err })
      })
  }
)

router.get(
  '/get-comments?',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // console.log('request->params', req.query)
    post
      .findById(req.query.id)
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'postedBy',
          model: 'User',
          select: 'name profile'
        }
      })
      .then((result) => {
        if (res) console.log(result)
        res.status(200).json(result.comments)
      })
      .catch((err) => {
        console.log(err)
        res.status(422).json({ error: err })
      })
  }
)

router.get(
  '/get-likes?',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.query)
    post
      .findById(req.query.id)
      .populate({
        path: 'likes',
        model: 'User',
        select: 'name'
      })
      .then((result) => {
        if (res) console.log(result)
        res.status(200).json({
          succes: true,
          count: result.likes.length,
          likes: result.likes
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(422).json({ error: err })
      })
  }
)

//like a post
router.put(
  '/like',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body)
    post
      .findById(req.body.id)
      .populate({ path: 'likes', model: 'User', select: 'name' })
      .then((response) => {
        if (response) {
          const data = response.likes.filter(
            (item) => item['_id'] == req.user.id
          )
          if (data.length > 0) {
            return res
              .status(401)
              .json({ error: 'Bad request, post already liked by user' })
          }
          post
            .findByIdAndUpdate(
              req.body.id,
              {
                $push: { likes: req.user.id }
              },
              {
                new: true
              }
            )
            .then((result) => {
              res.status(200).json(result)
            })
            .catch((error) => res.status(422).status(error))
        } else {
          return res.status(404).json({ error: 'Post not found' })
        }
      })
      .catch((error) => console.log(error))
  }
)

router.put(
  '/unlike',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    post
      .findById(req.body.id)
      .populate({ path: 'likes', model: 'User', select: 'name' })
      .then((response) => {
        if (response) {
          const data = response.likes.filter(
            (item) => item['_id'] == req.user.id
          )
          if (data.length === 0) {
            return res
              .status(401)
              .json({ error: 'Bad request, post is not liked by user' })
          }
          post
            .findByIdAndUpdate(
              req.body.id,
              {
                $pull: { likes: req.user.id }
              },
              {
                new: true
              }
            )
            .then((result) => {
              res.status(200).json(result)
            })
            .catch((error) => res.status(422).status(error))
        } else {
          return res.status(404).json({ error: 'Post not found' })
        }
      })
  }
)

router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    post.find()
  }
)

module.exports = router
