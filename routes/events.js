const express =require("express")
const router = express.Router()

router.get("/id",(req,res,next)=>{
    res.json({msg:"event id is working"})
})
router.get("/notification",(req,res,next)=>{
    res.json({msg:"notification  is working"})
})
router.get("/category",(req,res,next)=>{
    res.json({msg:"category is working"})
})

router.post("/register",(req,res,next)=>{
    console.log(res)
    const newEvents =new Events({
      name: req.body.name,
      eventurl: req.body.eventurl,
      date: req.body.date,  
    })
    newEvents.save().then(result=>{
        res.json(result).status(200)
    })
})

module.exports =router