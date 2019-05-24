const express = require("express")
const router = express.Router()

const User = require('@models/user')
const Room = require('@models/room')
const Vote = require('@models/vote')

router.get("/", (req, res) => {
    json_test = {response:'Hello, world'};
    res.json(json_test.response);
    /*
    var mango = new User({
        nickname: "mango",
        email: "mango@sparcs.org",
        is_admin: false,
        type: -1});
    mango.save((err, user) => {
        if(err) return console.error(err);
        else console.log("Successfully saved.");
    });
    */
});

module.exports = router
