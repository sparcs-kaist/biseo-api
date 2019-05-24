const express = require("express")
const router = express.Router()
const ssoClient = require("@ssoClient")
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
        console.log(response)
        if(response.hasOwnProperty("sparcs_id") === true){
            User.findOne({nickname: response.sparcs_id}, (err, user) => {
                if(err) res.json({'success': false});
                if(user){
                    res.json({'success': true, 'new': false});
                }else{
                    const _user = new User({
                        nickname: response.sparcs_id,
                        mail: response.email,
                        is_admin: false,
                        type: 0});
                    _user.save((err, user) => {
                        if(err) res.json({'success': false});
                        else res.json({'success': true, 'new': true});
                    });
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
