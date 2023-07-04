const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Token = require('../models/Tokens');
const config = require('../config');
const https = require('https');

router.post("/savetoken", async(req, res)=>{
    try {
        const found = await Token.findOne({user_id: req.body.user_id});
        if(found){
            const update = await Token.findOneAndUpdate({user_id: req.body.user_id}, {requestToken: req.body.requestToken}, {new:true});
            res.json(update);
        }
        else {
            const token = new Token({
                user_id: req.body.user_id,
                requestToken: req.body.requestToken
            })

            const savedtoken = await token.save();
            res.json(savedtoken);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/gat", async (req, res)=>{
    
    try {
        let request_token = await Token.findOne({user_id:"6492b51044ea1559ddc4efdf"});

        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            }
        };

        const postdata = JSON.stringify({
            "api_secret_key": config.API_SECRET,
            "api_key":config.API_KEY,
            "request_token": request_token.requestToken
        })

        const req = https.request('https://developer.paytmmoney.com/accounts/v2/gettoken', options, (res) => {
            console.log(`Status Code: ${res.statusCode}`);
  
            res.on('data',async (data) => {
                const savedgat = await Token.findOneAndUpdate({user_id:"6492b51044ea1559ddc4efdf"}, {accessToken:data.toString()}, {new:true})
                console.log('Response:', data.toString());
            });
        });

        req.on('error', (error) => {
            console.error('Error:', error);
        });
        
        req.write(postdata);
        req.end();

        res.status(200).send("Access Token Generated")

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/fetchreq", async(req, res)=>{
    try {
        let request_token = await Token.findOne({user_id:"6492b51044ea1559ddc4efdf"});
        res.json(request_token.requestToken);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;