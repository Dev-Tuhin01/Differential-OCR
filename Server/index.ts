import express from "express";
import { Request } from "express";
import { Response } from "express";
import multer from "multer";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = 4000; //Port where the server will be hosted
const app = express(); //initializing express

const imageUploadPath = "./upload"; //path where the image will be loaded

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageUploadPath);
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`);
  },
});

const imageUpload = multer({ storage: storage }); //initializing multer

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
