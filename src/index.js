import axios from 'axios';
import express from 'express';
import cors from 'cors';
import _ from 'lodash';

import getAtalayaHotelsData from './atalaya.js';
import getResortHotelsData from './resort.js';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});

async function getHotels() {
  //Se obtienen los datos de los Hoteles Atayala
  const atalayaHotels = await getAtalayaHotelsData();
  //Se obtienen los datos de los Hoteles Resort
  const resortHotels = await getResortHotelsData();
  //Se concatenan ambos resultados
  return _.concat(atalayaHotels, resortHotels);
}

app.get('/hotelList', async (req, res) => {
  try {
    const hotels = await getHotels();
    
    //Se devuelve la respuesta
    const response = { hotels };
    res.json(response);
  } catch (error) {
    console.error(error);
  }
});
 