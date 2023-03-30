import UsersDAO from "../dao/usersDAO.js";

export default class UsersController{
    static async apiRegister(req, res, next){
        let u = req.body.username;
        let p = req.body.password;
        let e = req.body.email;
        const { username_t, password_t, email_t, error } = await UsersDAO.usersRegister(u, p, e,);
        let response = {
            username: username_t,
            password: password_t,
            email: email_t,
            error: error
        };
        res.json(response);
    }
    static async apiLogin(req, res, next){
        let u = req.body.username; // pass through either username OR email for login
        let p = req.body.password;
        let t = "";
        const { username_t, password_t, token_t, error } = await UsersDAO.usersLogin(u, p, t);
        let response = {
            username: username_t,
            password: password_t,
            token: token_t,
            error: error
        };
        res.json(response);
    }
    static async apiGetCalendar(req, res){
        const {id} = req.params;
        const {month} = req.params;
        const intoken = req.header("token");
        console.log(req.header("token"));
        console.log({month});
        const calander = await UsersDAO.getCalendar(id,month,intoken);
        if (calander) {
            res.status(200).json(calander);
        } 
        else {
            res.status(400).json({error: 'Unable to get calendar'});
        }
    }
}