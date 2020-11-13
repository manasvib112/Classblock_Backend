const express =require("express")
const router = express.Router()

router.get("/id",(req,res,next)=>{
    res.json({msg:"storywall id is working"})
})
router.get("/searchbar",(req,res,next)=>{
    res.json({msg:`${req.params}`})
})
router.get("/notification/id=:id",(req,res,next)=>{
    res.json({msg:`${req.params.id}`})
})
router.get("/posts/id=:id",(req,res,next)=>{
    res.json({msg:`${req.params.id}`})
})
router.get("/stories/id=:id",(req,res,next)=>{
    res.json({msg:`${req.params.id}`})
})
router.get("/page/id=:id",(req,res,next)=>{
    console.log(res)
    res.json({msg:`${req.params.id}`})
})
module.exports =router