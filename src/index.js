import express from 'express';
import cors from 'cors';

import getHotelList from './hotelList.js';
import getItinerary from './itinerary.js';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});

app.get('/hotelList', async (req, res) => {
  try {
    const hotels = await getHotelList();
    
    //Se devuelve la respuesta
    const response = { hotels };
    res.json(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/itineraryCancun', async (req, res) => {
  try {
    const hotels = await getItinerary();
    const response = { hotels };
    res.json(response);
  } catch (error) {
    res.status(500).send(error);
  }
});
