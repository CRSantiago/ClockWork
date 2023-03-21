import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
//let users;

export default class UsersDAO{
    static async usersLogin(uname, pass) {
        let username_t = ""; //   default values to indicate that user has not been registered correctly
        let password_t = "";
        let email_t = "";
        let error = "";
        // TODO: add support for logging in with email

        // Find the user in the database
        const jsonval = new Promise((resolve, reject)=>{
            User.find({username: uname}, function(err,data){
            if(err){
              console.log("ERROR");
              console.log(err);
              reject(new Error(`Error in usersLogin api, User.find: ${err}`));
              return
              }
        
            if(data.length == 0) {
              error = "No record found";
              console.log(error);
              resolve({username_t, password_t, email_t, error});
              return
              }
            bcrypt.compare(pass, data[0].password, (err, match) => {
                if(err){
                    console.log("ERROR");
                    console.log(err);
                    reject(new Error(`Error in usersLogin api, bcrypt.compare: ${err}`));
                    return
                    }
              console.log("Match: "+match);
              if (match){
                console.log("login successful");
                username_t = uname;
                resolve({username_t, password_t, email_t, error});
              }
              else{
                error = "wrong password!";
                console.log(error);
                resolve({username_t, password_t, email_t, error});
              }
            });
          });
        })

        return jsonval;
    }
    static async usersRegister(uname, pass, uemail, err) {
        let username_t = ""; //   default values to indicate that user has not been registered correctly
        let password_t = "";
        let email_t = "";
        let error = "";
        // Promise here is used because User.find is async
        // if we didn't have this, the function wouldn't wait for User.find to finish and it would return the default vals for the json body
        //https://blog.logrocket.com/guide-promises-node-js/
        const jsonval = new Promise((resolve, reject)=>{
            User.find({username: uname}, function(err,data){ // check username
                if(err){
                  console.log(err);
                  }
                if(data.length == 0) {
                    User.find({email: uemail}, function(err,data){ // check email
                        if(err){
                            console.log(err);
                            }
                        if(data.length == 0) {
                            bcrypt.genSalt(5, (err, salt)=>{
                              bcrypt.hash(pass, salt, (err, hash) => {
                                console.log("can make user");
                                //update database...
                                username_t = uname;
                                //  Probably shouldnt return password in json, even if its hashed
                                //password_t = hash;
                                email_t = uemail;
                                const newUser = new User({
                                    username: username_t ,
                                    //password: password_t,
                                    password: hash,
                                    email: email_t
                                })
                                newUser.save((err, user) =>{
                                    if (err) {
                                        console.log(err);
                                        reject(new Error("Error when saving user to database in usersRegister api"));
                                    }
                                    else{
                                        console.log(user);
                                        resolve({username_t, password_t, email_t, error});
                                    }   
                                })
                              });
                            });
                        }
                        else{
                            error = "email is already in use!";
                            console.log(error);
                            resolve({username_t, password_t, email_t, error});
                        }
                    });
                    }
                    else{
                        error = "user already exists!";
                        console.log(error);
                        resolve({username_t, password_t, email_t, error});
                    }
              });
        })
        return jsonval;
    }
}
