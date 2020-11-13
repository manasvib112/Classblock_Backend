const express = require("express")
const router = express.Router()

router.get("/id",(req,res,next)=>{
    res.json({msg:'classroomid is working'})
})
router.get("/class",(req,res,next)=>{
    res.json({msg:'class is working'})
})
router.get("/faculty",(req,res,next)=>{
    res.json({msg:'faculty is working'})
})

router.get("/studyitems",(req,res,next)=>{
    res.json({msg:'studyitem is working'})
})

router.get("/notification",(req,res,next)=>{
    res.json({msg: 'notification is working'})
})

router.post("/register",(req,res,next)=>{
    console.log(res)
    const newClassroom = new Classroom({
        studentName: req.body.studentName,
        teacherName: req.body.teacherName,
        subjectName: req.body.subjectName,
        teacherProfileurl: req.body.teacherProfileurl,
    })
    newClassroom.save().then(result=>{
        res.json(result).status(200)
    })
})

module.exports = router