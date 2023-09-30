import express from "express";

const router = express.Router();

router.get('/', (req,res)=>{
    res.send("").status(200)
})
router.get("/login", (req,res) =>{
    console.log("hi")
    res.send("login").status(200);
})

export default router;