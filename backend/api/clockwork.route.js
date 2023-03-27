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
    TaskCtrl.apiCreateTask(req, res);
});
router.get("/tasks/:id", function(req, res)
{
    TaskCtrl.getTasks(req, res);
});
router.get("/verify/:uniqueString", function(req,res)
{
    UsersCtrl.apiVerify(req, res);
});
router.get("/calendar/:userId", function(req, res)
{
    CalendarCtrl.getCalendar(req, res);
});



//router.route("/").get((req,res) => res.send("hello world"));


export default router;