import express from "express";
import fs from 'fs';
import PDFDocument from 'pdfkit';
import cors from 'cors';

const app = express()
const port = 3000


// app.use(express.json())
app.use(cors())

app.get("/", (req, res ) => {
    res.send('API Generator PDF')
});

app.get("/generator-pdf", (req, res) => {
  console.log('test')
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('./pdfFiles/example.pdf'))
  doc.pipe(res)
  doc.fontSize(21).text('HELLO THIS IS A PDF')
  doc.text('Hello world!', 100, 100)

  doc.end();
})

app.get("/generator-form", (req, res ) => {
  res.send(' Generator form')
});


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
