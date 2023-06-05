import express from "express";
import { Request } from "express";
import { Response } from "express";
import multer from "multer";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

const PORT = 4000; //Port where the server will be hosted
const app = express(); //initializing express
const date = new Date();
const imageUploadPath = "./upload"; //path where the image will be loaded

let imageName = "test" + date.getTime();
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageUploadPath);
  },
  filename: function(req, file, cb) {
    imageName.concat(path.extname(file.originalname));
    cb(null, `${imageName}`);
  },
});

const imageUpload = multer({ storage: storage }); //initializing multer
console.log(imageName);

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

//adding body-parser code
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173/");
  res.send("working");
});

app.post(
  "/image-upload",
  imageUpload.array("sample-image-file"),
  (req: Request, res: Response) => {
    console.log("App is running");
    console.log(`Axios POST body: ${req.body}`);
    res.send("POST request recieved on server to /image-upload.");
  }
);

app.listen(PORT, () => {
  console.log(`app is running on port : http://localhost:${PORT}`);
});
