const express = require('express');
const router = express.Router();
const User = require('../models/Users');

router.post("/add", async (req,res) =>{
    try {
        let found = await User.findOne({username: req.body.username});
        if (found) {
            return res.status(400).json({error:"Username already exists"})
        }
        const user = await User.create({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;