import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import uploadResume from "./controllers/uploadResume.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();
app.listen(process.env.port, () =>
  console.log(`running on ${process.env.port}`)
);
app.use(
  cors({
    // origin: [process.env.frontend_url],
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

if (!fs.existsSync("resumes")) {
  fs.mkdir("resumes", (err) => {
    if (err) console.log(err);
  });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "resumes/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    // cb(null, file.fieldname + ".pdf");
  },
});
const upload = multer({ storage: storage });
app.post("/upload-resume", upload.single("resume"), uploadResume);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const questionsFilePath = path.join(__dirname, "questions.json");
app.get("/test-questions", (req, res) => {
  fs.readFile(questionsFilePath, "utf8", (err, data) => {
    console.log("reading");

    if (err) {
      // return res.status(500).send("Error reading file");
      console.log(err);
    }
    const jsonData = JSON.parse(data);
    // console.log(jsonData);

    res.json(jsonData);
  });
});

const candidatesFilePath = path.join(__dirname, "candidates.json");
app.get("/candidates-data", (req, res) => {
  fs.readFile(candidatesFilePath, "utf8", (err, data) => {
    console.log("reading");

    if (err) {
      // return res.status(500).send("Error reading file");
      console.log(err);
    }
    const jsonData = JSON.parse(data);
    // console.log(jsonData);

    res.json(jsonData);
  });
});
