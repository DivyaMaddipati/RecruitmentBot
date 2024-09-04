export default function uploadResume(req, res) {
  if (!req.file) {
    return res.status(400).json("No file was uploaded.");
  }

  // Access the uploaded file
  const uploadedFile = req.file;

  // Process the file as needed
  // ...
  // console.log(req.body.filename);
  res.json("File uploaded successfully!");
}
