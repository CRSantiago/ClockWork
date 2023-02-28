import express from "express";
import cors from "cors";
import clockwork from "./api/clockwork.route.js";

const app = express();

app.use(cors());
app.use(express.json());

// routing
app.use("/api/v1/clockwork", clockwork);
app.use("*", (req,res) => res.status(404).json({ error: "not found"}));

export default app;