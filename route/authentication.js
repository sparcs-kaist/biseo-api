const express = require("express")
const router = express.Router()
const ssoClient = require("@ssoClient")
const jwt = require('jsonwebtoken')

// load secret config
const secretConfig = require("@secretConfig")

// Models
const User = require('@models/user')

const client = new ssoClient(secretConfig.ssoClientId, secretConfig.ssoSecretKey)

/**
 * POST /auth/login
 */
router.get("/login", (req, res) => {
    const loginParams = client.getLoginParams();
    console.log(loginParams);
    res.redirect(loginParams.url);
});

/**
 * GET /auth/login/callback
 */
router.get("/login/callback", (req, res) => {
    client.getUserInfo(req.query.code).then((response) => {
        if(response.hasOwnProperty("sparcs_id") === true){
            User.findOne({nickname: response.sparcs_id}, (err, user) => {
                let success = true;
                let targetUser = true;
                if(err){
                    res.json({'success': false});
                    success = false;
                }
                if(user){
                    targetUser = user;
                    //res.json({'success': true, 'new': false});
                }else{
                    const _user = new User({
                        nickname: response.sparcs_id,
                        mail: response.email,
                        is_admin: false,
                        type: 0});
                    _user.save((err, user) => {
                        targetUser = user;
                        if(err){
                            res.json({'success': false});
                            success = false;
                        } //else res.json({'success': true, 'new': true});
                    });
                }
                if(success){
                    let token = jwt.sign(JSON.stringify(targetUser),
                            secretConfig.jwtSecretKey);
                    res.cookie(secretConfig.cookieName, token);
                    res.json({success: true, user: targetUser, msg: 'Hello, ' + response.sparcs_id});
                }
            });
        }else{
            // user is not sparcs member!
            res.json({success: false, msg: 'you are not sparcs member'});
        }
        //res.redirect(secretConfig.entryPoint)
    });
});

module.exports = router
