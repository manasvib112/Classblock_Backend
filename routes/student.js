const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/keys");
const Student = require("../models/Student");
const e = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

router.get("/id", (req, res, next) => {
  res.json({ msg: "student id  is working" });
});

router.post("/register", (req, res, next) => {
  Student.findOne({
    $or: [{ email: req.body.email }, { enrollment: req.body.enrollment }],
  }).then((student) => {
    if (student)
      res.json({ msg: "Student with email or enrollment already exists" });

    console.log(req.body);
    const newStudent = new Student({
      name: req.body.name,
      enrollment: req.body.enrollment,
      email: req.body.email,
      mobilenumber: req.body.mobilenumber,
      password: req.body.password,
    });
    bcrypt.genSalt(10, (error, salt) => {
      if (error) throw error;
      bcrypt.hash(newStudent.password, salt, (error, hash) => {
        if (error) throw error;
        newStudent.password = hash;
        newStudent
          .save()
          .then((result) => {
            res.json(result).status(200);
          })
          .catch((error) => {
            if (error) throw error;
          });
      });
    });
  });
});

router.post("/login", (req, res) => {
  //console.log(req);
  const enrollment = req.body.enrollment;
  const password = req.body.password;
  Student.findOne({ enrollment: enrollment }).then((student) => {
    if (!student) res.json({ msg: "No student with this enrollment exists" });
    bcrypt.compare(password, student.password).then((isMatch) => {
      console.log("password is matching", isMatch);
      if (isMatch) {
        const payload = {
          id: student._id,
          enrollment: student.enrollment,
          name: student.name,
          type: "Student",
        };
        jwt.sign(payload, secret, { expiresIn: 3600 }, (error, token) => {
          if (error) res.json({ error }).status(401);
          res.json({ success: true, token: `Bearer ${token}` });
        });
      } else res.json({ msg: "Password does not match" }).status(400);
    });
  });
});

//student follow student
router.put(
  "/follow/student",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Student.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followedByStudent: req.user.id },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
    });
    Student.findByIdAndUpdate(
      req.user.id,
      {
        $push: { studentFollowing: req.body.followId },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result).status(200);
      }
    });
  }
);

// student follow teacher
router.put(
  "/follow/teacher",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Student.findByIdAndUpdate(
      req.user.id,
      {
        $push: { teacherFollowing: req.body.followId },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
    });
    const Teacher = mongoose.model("teacher");
    Teacher.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followedByStudent: req.user.id },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.status(200).json(result);
      }
    });
  }
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
