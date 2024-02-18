import express from "express";
import fs from 'fs';
import PDFDocument from 'pdfkit';
import cors from 'cors';
import db from './db'

const app = express()
const port = 3000


app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send('API Generator PDF')
});

app.post("/generator-form", async (req, res) => {
  const userInfo = req.body

  try {
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
  doc.pipe(res)
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('beige')
  doc.image('src/img/pokemon-logo.png', 150, 15, { height: 110 });
  doc.fill("black");
  doc.fontSize(22).text(`Hello ${userInfo.firstName.toUpperCase()} ${userInfo.lastName.toUpperCase()} and welcome to this Pokemon adventure !`,100, 180, {align: 'center'})
  doc.fontSize(16).text(`You'll have to battle the various arenas in the region and complete your pokedex for a little surprise !`,100, 250, {align: 'center'})
  doc.image('src/img/pokeball.png', 200, 290, { height: 210 });

  if (userInfo.favouritePokemonGame == 'black&white') {
    doc.text(`You've chosen the ${userInfo.favouritePokemonGame.toUpperCase()} game, you are one of a kind, please accept this gift :`, 100, 515,  {align: 'center'});
    doc.image('src/img/comet-shard.png', 230, 555, { height: 150 });
  } else if (userInfo.favouritePokemonGame == 'xy') {
    doc.text(`You've chosen the ${userInfo.favouritePokemonGame.toUpperCase()} game, you are a person with good taste, please accept this gift :`, 100, 515,  {align: 'center'})
    doc.image('src/img/big-nugget.png', 230, 555, { height: 150 });
  } else {
    doc.text(`you've chosen another game besides Black&White or XY, you should think about your taste . Here's what you deserve :`, 100, 515,  {align: 'center'})
    doc.image('src/img/restes.png', 230, 570, { height: 150 });
  }

  doc.fontSize(12).text(`Have fun :)`, 80, 750, {align: 'center'})
  
  if (typePokemonImage[userInfo.typePokemon]) {
    doc.image(typePokemonImage[userInfo.typePokemon], 20, 760, { height: 75 });
  }
  

  doc.end();

  const [result] = await db.execute('INSERT INTO DOCUMENT(TITLE_PDF, FIRSTNAME_USER, LASTNAME_USER, TYPE_POKEMON_USER, GAME_POKEMON_USER) VALUES(?, ?, ?, ?, ?)', [userInfo.titlePdf, userInfo.firstName, userInfo.lastName, userInfo.typePokemon, userInfo.favouritePokemonGame])
} 
catch(error) {
  console.error(error)
}
});

app.post("/regenerate-pdf", async (req, res) => {
  const userInfo = req.body

  try {
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
  doc.pipe(res)
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('beige')
  doc.image('src/img/pokemon-logo.png', 150, 15, { height: 110 });
  doc.fill("black");
  doc.fontSize(22).text(`Hello ${userInfo.firstName.toUpperCase()} ${userInfo.lastName.toUpperCase()} and welcome to this Pokemon adventure !`,100, 180, {align: 'center'})
  doc.fontSize(16).text(`You'll have to battle the various arenas in the region and complete your pokedex for a little surprise !`,100, 250, {align: 'center'})
  doc.image('src/img/pokeball.png', 200, 290, { height: 210 });

  if (userInfo.favouritePokemonGame == 'black&white') {
    doc.text(`You've chosen the ${userInfo.favouritePokemonGame.toUpperCase()} game, you are one of a kind, please accept this gift :`, 100, 515,  {align: 'center'});
    doc.image('src/img/comet-shard.png', 230, 555, { height: 150 });
  } else if (userInfo.favouritePokemonGame == 'xy') {
    doc.text(`You've chosen the ${userInfo.favouritePokemonGame.toUpperCase()} game, you are a person with good taste, please accept this gift :`, 100, 515,  {align: 'center'})
    doc.image('src/img/big-nugget.png', 230, 555, { height: 150 });
  } else {
    doc.text(`you've chosen another game besides Black&White or XY, you should think about your taste . Here's what you deserve :`, 100, 515,  {align: 'center'})
    doc.image('src/img/restes.png', 230, 570, { height: 150 });
  }

  doc.fontSize(12).text(`Have fun :)`, 80, 750, {align: 'center'})
  
  if (typePokemonImage[userInfo.typePokemon]) {
    doc.image(typePokemonImage[userInfo.typePokemon], 20, 760, { height: 75 });
  }
  

  doc.end();
} 
catch(error) {
  console.error(error)
}
});

app.get("/history", async (req, res) => {
  try {
    const history_data = await db.execute('SELECT * FROM DOCUMENT');

    res.status(200).json(history_data[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/view-pdf", async (req, res) => {
  try {
      const pdfId = req.body.ID;
      const getPdf = await db.execute(`SELECT * FROM DOCUMENT WHERE ID = ${pdfId}`);
      res.status(200).json(getPdf[0]);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error' });
  }
});

app.post("/delete-pdf", async (req, res) => {
  try {
      const pdfId = req.body.ID;
      db.execute(`DELETE FROM DOCUMENT WHERE ID = ${pdfId}`);
      res.status(200).json();
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error' });
  }
});


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
