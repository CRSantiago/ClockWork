import app from './server.js'
// import mongodb from "mongodb";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
// import UsersDAO from "./dao/usersDAO.js";

dotenv.config()
//const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000 //8000 if env can't be accessed
mongoose
  .connect(process.env.RESTCLOCKWORK_DB_URI, {
    MaxPoolSize: 50, // maximum num users connected at a time
    wtimeoutMS: 2500, // timeout request after amt of time
    useNewUrlParser: true,
  })
  .catch((err) => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async (client) => {
    //await UsersDAO.injectDB(client);
    app.listen(port, () => {
      // start webserver
      console.log(`listening on port ${port}`)
    })
  })
