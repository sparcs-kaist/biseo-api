const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const secretConfig = require("@secretConfig");

const User = require('@models/user');
const Room = require('@models/room');
const Vote = require('@models/vote');

const isAuthenticated = (token) => {
    return new Promise((resolve, reject) => {
        if(!token) resolve(null);
        jwt.verify(token, secretConfig.jwtSecretKey, (err, decoded) => {
            if(err) resolve(null);
            User.findById(decoded["_id"], (err, user) => {
                if((!err) && user && (user.nickname === decoded["nickname"])){
                    resolve(user);
                }else{
                    resolve(null);
                }
            });
        });
    });
}

router.get("/", (req, res) => {
    json_test = {response: 'Hello, world'};
    res.json(json_test.response);
});

router.get("/verify", (req, res) => {
    isAuthenticated(req.cookies[secretConfig.cookieName]).then((user) => {
        if(!user){
            res.json({success: false, err: "User authentication failed"});
            return;
        }
        json_test = {response:'Hello, world'};
        res.json(json_test.response);
    });
});


module.exports = router
