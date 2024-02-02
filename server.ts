import express from "express";
import fs from 'fs';
import PDFDocument from 'pdfkit';
import cors from 'cors';

const app = express()
const port = 3000


app.use(express.json())
app.use(cors())

app.get("/", (req, res ) => {
    res.send('API Generator PDF')
});

app.get("/generator-pdf", (req, res) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('./pdfFiles/example.pdf'))
  doc.pipe(res)
  doc.fontSize(21).text('HELLO THIS IS A PDF')
  doc.text('Hello world!', 100, 100)

  doc.end();
})

app.post("/generator-form", (req, res ) => {
  const userInfo = req.body
  console.log(userInfo.name)
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('./pdfFiles/aaa.pdf'))
  doc.pipe(res)
  doc.text(`Hello ${userInfo.name}`, 100, 100)

  doc.end();
});


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
