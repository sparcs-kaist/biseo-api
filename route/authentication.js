const express = require("express")
const router = express.Router()

const User = require('@models/user')

router.get("/login", (req, res) => {
    json_test = {response:'Do you wanna login?'};
    res.json(json_test.response);
});

module.exports = router
