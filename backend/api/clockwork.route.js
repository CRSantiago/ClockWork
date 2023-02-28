import express from "express";
import UsersCtrl from "./users.controller.js"

const router = express.Router();

router.post("/register", function(req, res){
    UsersCtrl.apiRegister(req,res);
});
router.post("/login", function(req, res){
    UsersCtrl.apiLogin(req,res);
});
//router.route("/").get((req,res) => res.send("hello world"));


export default router;