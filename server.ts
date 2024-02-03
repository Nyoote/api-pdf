import express from "express";
import fs from 'fs';
import PDFDocument from 'pdfkit';
import cors from 'cors';

const app = express()
const port = 3000


app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send('API Generator PDF')
});


app.post("/generator-form", (req, res) => {
  const userInfo = req.body

  type TypePokemonImage = { [key: string]: string };

  const typePokemonImage: TypePokemonImage = {
    'fire': 'src/img/fire-bird.png',
    'plant': 'src/img/plant-bird.png',
    'water': 'src/img/water-bird.png',
    'normal': 'src/img/normal-bird.png',
    'electric': 'src/img/electric-bird.png',
    'poison': 'src/img/poison-bird.png',
    'ice': 'src/img/ice-bird.png',
    'dragon': 'src/img/dragon-bird.png',
    'fairy': 'src/img/fairy-bird.png'
  };

  const doc = new PDFDocument({size: 'A4'});  
  doc.pipe(fs.createWriteStream(`src/pdfFiles/${userInfo.titlePdf}.pdf`))
  doc.pipe(res)
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('beige')
  doc.fill("black");
  doc.fontSize(20).text(`${userInfo.firstName} ${userInfo.lastName}`, {align: 'center'})
  
  if (typePokemonImage[userInfo.typePokemon]) {
    doc.image(typePokemonImage[userInfo.typePokemon], 20, 750, { height: 75 });
  }

  doc.end();
});


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
