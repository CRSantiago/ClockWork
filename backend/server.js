import express from "express";
import cors from "cors";
import clockwork from "./api/clockwork.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT|| 8000; //8000 if env can't be accessed
// routing
app.use("/api/v1/clockwork", clockwork);
app.use("*", (req,res) => res.status(404).json({ error: "not found"}));
app.listen(port, () =>{      // start webserver
    console.log(`listening on port ${port}`);
});

export default app;