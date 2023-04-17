import express from "express";
import UsersCtrl from "./users.controller.js"
import TaskCtrl from "./tasks.controller.js"

const router = express.Router();

router.post("/register", function(req, res){
    UsersCtrl.apiRegister(req,res);
});
router.post("/login", function(req, res){
    UsersCtrl.apiLogin(req,res);
});
router.post("/createTask", function(req, res)
{
    TaskCtrl.apiCreateTask(req, res);
});
router.post("/deleteTask", function(req, res)
{
    TaskCtrl.apiDeleteTask(req, res);
});
router.get("/getTask/:id", function(req, res)
{
    TaskCtrl.apiGetTask(req, res);
});
router.get("/getCalendar/:id/:month", function(req, res)
{
    UsersCtrl.apiGetCalendar(req, res);
});
router.get("/verify/:uniqueString", function(req,res)
{
    UsersCtrl.apiVerify(req, res);
});
router.patch("/updateTask/:id/:taskId", function (req, res) {
    TaskCtrl.apiUpdateTask(req, res);
});
router.delete("/deleteTask/:id/:taskId", function (req, res) {
    TaskCtrl.apiDeleteTask(req, res);
});
router.post("/requestPasswordReset", function (req, res) {
    UsersCtrl.apiRequestPasswordReset(req, res);
});
router.post("/resetPassword/:token", function (req, res) {
    UsersCtrl.apiResetPassword(req, res);
});

//router.route("/").get((req,res) => res.send("hello world"));

export default router
