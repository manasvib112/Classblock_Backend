const express = require('express')
const { session } = require('passport')
const mongoose = require('mongoose')
const passport = require('passport')
const router = express.Router()
const Class = require('../models/Classroom')

const UnauthorizedUser = (user) =>
  user.type !== 'teacher' && user.type !== 'admin' && user.type !== 'super'

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    if (UnauthorizedUser(req.user)) {
      res.status(401).json({ error: 'Unauthorized user' })
    } else {
      const schedule = []
      req.body.day.map((item, index) => {
        schedule.push({ day: item, time: req.body.time[index] })
      })
      const newClass = new Class({
        name: req.body.name,
        teachers: [req.user.id],
        schedule: schedule
      })
      newClass
        .save()
        .then((entry) => {
          if (entry) {
            res.json({ msg: 'class created', success: true, class: entry })
          }
          res.status(404).json({ error: 'Error creating class' })
        })
        .catch((error) => {
          res.status(400).json({ error })
        })
    }
  }
)

router.post(
  '/enroll',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body)
    if (UnauthorizedUser(req.user)) {
      res.status(401).json({ error: 'Unauthorized user' })
    } else {
      let students = []
      if (typeof req.body.students === 'string') {
        students.push(req.body.students)
      } else if (Array.isArray(req.body.students)) {
        req.body.students.map((item) => {
          console.log(item)
          students.push(mongoose.Types.ObjectId(item))
        })
        console.log(students, '\n\n')
      }
      Class.findByIdAndUpdate(req.body.class, {
        $push: { students: { $each: students } }
      })
        .populate({ path: 'students', model: 'User', select: 'name uid' })
        .then((result) => {
          if (result) return res.json(result)
          res.status(401).json({ error: 'Could not enroll the students' })
        })
        .catch((error) => res.status(400).json(error))
    }
  }
)

router.post(
  '/add-post',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const Post = mongoose.model('Post')
    console.log(req.body)
    console.log(req.user)
    const newPost = new Post({
      postedBy: req.user.id,
      content: req.body.content,
      class: req.body.class
    })
    newPost
      .save()
      .then((entry) => {
        if (entry) {
          console.log(entry)
          Class.findByIdAndUpdate(req.body.class, {
            $push: { posts: entry._id }
          })
            .populate({ path: 'posts', model: 'Post', select: 'content' })
            .then((classEntry) => {
              if (classEntry) {
                return res.status(200).json({
                  success: true,
                  msg: 'Post added to class',
                  class: classEntry
                })
              } else {
                return res
                  .status(400)
                  .json({ error: 'Could not add post to class' })
              }
            })
            .catch((error) => res.status(400).json({ error }))
        } else {
          return res.status(400).json({ error: 'Could not create post' })
        }
      })
      .catch((error) => res.status(400).json({ error: 'error creating post' }))
  }
)
router.get(
  '/posts/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //TODO
    // Restrict users outside the class from viewing the contents
    Class.findById(req.params.id)
      .populate({ path: 'posts', model: 'Post' })
      .then((result) => {
        if (result) {
          const posts = result.posts
          res.json({ success: true, posts })
        }
        res.status(404).json({ success: false, error: 'Classroom not found' })
      })
      .catch((error) => {
        res.status(400).json(error)
      })
  }
)

router.get(
  '/get-user-classrooms/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.params)
    Class.find({ students: req.params.id })
      .then((result) => {
        if (result.length > 0) {
          return res.json({ success: true, classes: result })
        }
        res.status(404).json({ error: 'No classes found' })
      })
      .catch((error) => {
        res.status(404).json(error)
      })
  }
)

module.exports = router
