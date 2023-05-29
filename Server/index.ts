import express from "express";
import { Request } from "express";
import { Response } from "express";
import multer from "multer";
import cors from "cors";
const PORT = 4000 || process.env.IP;
const app = express();
const upload = multer({
  dest: "./upload/",
});

//adding Cors
const corsOrigin = "http://localhost:5173";
app.use(
  cors({
    origin: [corsOrigin],
    methods: ["get", "post"],
    allowedHeaders: "*",
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173/");
  res.send("working");
});

app.post("/image-upload", (req: Request, res: Response) => {
  console.log("App is running");
  console.log(`Axios POST body: ${req.body}`);
  res.send("POST request recieved on server to /image-upload.");
});

app.listen(PORT, () => {
  console.log(`app is running on port : http://localhost:${PORT}`);
});
