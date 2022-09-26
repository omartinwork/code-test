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

app.get('/hotelList', async (req, res) => {
  try {
    //Se obtienen los datos de los Hoteles Atayala
    const atalayaHotels = await getAtalayaHotelsData();
    //Se obtienen los datos de los Hoteles Resort
    const resortHotels = await getResortHotelsData();
    //Se concatenan ambos resultados
    const allHotels = _.concat(atalayaHotels, resortHotels);
    //Se devuelve la respuesta
    const response = { hotels: allHotels };
    res.json(response);


  } catch (error) {
    console.error(error);
  }
});
 