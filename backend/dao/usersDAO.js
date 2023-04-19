import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const nodemailer = import("nodemailer");
import randString from "../methods/randString.js";
import sendMail from "../methods/sendMail.cjs";
import sendMailPR from "../methods/sendMailPR.cjs";
import crypto from "crypto";
//let users;

export default class UsersDAO{
    static async usersLogin(uname, pass, token) {
        let _id_t = "";
        let username_t = ""; //   default values to indicate that user has not been registered correctly
        let password_t = "";
        let token_t = "";
        let error = "";

        // Find the user in the database
        const jsonval = new Promise((resolve, reject)=>{
            if (uname == "" || pass == ""){
              error = "field cannot be empty";
              console.log(error);
              resolve({username_t, password_t, token_t, error});
            }
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
              resolve({username_t, password_t, token_t, error});
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
              if (!data[0].isVerified){ // NOT VERIFIED
                error = "user not verified";
                console.log(error);
                resolve({_id_t, username_t, password_t, token_t, error});
              }
              if (match){
                console.log("login successful");
                username_t = uname;
                _id_t = data[0]._id;
                token_t = jwt.sign({ username_t }, 
                  process.env.JWT_SECRET_KEY, {
                      expiresIn: 86400
                  });
                resolve({_id_t, username_t, password_t, token_t, error});
              }
              else{
                error = "wrong password!";
                console.log(error);
                resolve({_id_t, username_t, password_t, token_t, error});
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

        const uniqueStr = randString();
        // Promise here is used because User.find is async
        // if we didn't have this, the function wouldn't wait for User.find to finish and it would return the default vals for the json body
        //https://blog.logrocket.com/guide-promises-node-js/
        const jsonval = new Promise((resolve, reject)=>{
            if (uname == "" || pass == "" || uemail == ""){
              error = "field cannot be empty";
              console.log(error);
              resolve({username_t, password_t, email_t, error});
            }
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
                                email_t = uemail;
                                const newUser = new User({
                                    username: username_t ,
                                    password: hash,
                                    email: email_t,
                                    uniqueString: uniqueStr
                                })
                                newUser.save((err, user) =>{
                                    if (err) {
                                        console.log(err);
                                        reject(new Error("Error when saving user to database in usersRegister api"));
                                    }
                                    else{
                                        console.log(user);
                                        resolve({username_t, password_t, email_t, error});
                                        sendMail(email_t, uniqueStr);
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
    static async getCalendar(id,month,token) {
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      let jwttoken = token;
      try {
        const verified = jwt.verify(jwttoken, jwtSecretKey);
        if (verified){
            const user = await User.findOne({_id: id});
            console.log(user.calendar[month]);
            return user.calendar[month];
            }
      }catch (error) {
        console.error(error);
        return error;
        }
    }
    static async verifyEmail(uniqueString)
        {
          //check users for this string
          const user = await User.findOne({ uniqueString: uniqueString});
          if(user){
              user.isVerified = true;
              await user.save();
              // Return a value indicating success
              return { success: true };
          }
          else{
              // Return a value indicating failure
              return { success: false, message: 'User not found' };
          }
        }
    static async createPasswordResetToken(email) {
      const user = await User.findOne({ email });

      if(!user) 
      {
        return { success: false, message: 'User not found'};
      }
      //creates token using crypto
      const token = crypto.randomBytes(20).toString('hex');
      user.passwordResetToken = token;
      user.passwordResetTokenExpires = Date.now() + 900000; // 15 minutes
      //saves user with password reset token and expiration
      await user.save();

      sendMailPR(user.email, token);

      return {success: true};

    }

    static async resetPassword(token, newPassword) {
      const user = await User.findOne({
        passwordResetToken: token,
        passwordResetTokenExpires: { $gt: Date.now() },
      });

      if (!user) {
        return { success: false, message: 'Invalid or expired token' };
      }

      //hash new password
      const salt = bcrypt.genSaltSync(5);
      const hash = await bcrypt.hash(newPassword, salt);

      //store password in user and change tokens to undefined
      user.password = hash;
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpires = undefined;

      await user.save();

      return { success: true};
    
    }
}
