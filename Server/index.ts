import express from "express";
import { Request, Response } from "express";
import multer from "multer";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { createWorker } from "tesseract.js";
import gm from "gm";

const PORT = 4000; //Port where the server will be hosted
const app = express(); //initializing express
const date = new Date();
const imageUploadPath = "./upload"; //path where the image will be loaded

let imageName = "";
function getImageName(name: string) {
  imageName = name;
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageUploadPath);
  },
  filename: function(req, file, cb) {
    const imageName = "test" + date.getTime() + path.extname(file.originalname);
    getImageName(imageName);
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
  async (req: Request, res: Response) => {
    console.log("App is running");
    console.dir(`Axios POST body: ${req.body}`);
    res.send("POST request recieved on server to /image-upload.");

    try {
      //@ts-ignore:
      const imagePath = req.file.path;

      //image preprocessing
      gm(imagePath)
        .noise("gaussian")
        .resize(1000, 1000)
        .contrast(-5)
        .write(imagePath, async (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "failed to preprocess the image." });
            return;
          }

          //performing OCR on the preprocessed image

          const worker = await createWorker({
            logger: (m) => console.log(m),
          });

          await worker.load();
          await worker.loadLanguage("eng");
          await worker.initialize("eng");
          const { data } = await worker.recognize(imagePath);
          const { text } = data;
          await worker.terminate();

          console.log(text.toString());
          //perform segmentation and symbol reconiztion
          // const segmentedText = performSegmentationAndSymbolRecognition(text);

          // res.json({ text: segmentedText });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "failed to perform OCR on this page" });
    }
  }
);

// function performSegmentationAndSymbolRecognition(text: string) {
//   //Regular expressions to
//   //
//   return segmentendText;
// }

app.listen(PORT, () => {
  console.log(`app is running on port : http://localhost:${PORT}`);
});
