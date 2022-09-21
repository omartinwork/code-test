import axios from 'axios';
import express from 'express'
import cors from 'cors'

async function getAtalayaHotels() {
  return axios.get('http://www.mocky.io/v2/5e4a7e4f2f00005d0097d253');
}

async function getAtalayaRooms() {
  return axios.get('https://run.mocky.io/v3/132af02e-8beb-438f-ac6e-a9902bc67036');
}

async function getAtalayaMealPlans() {
  return axios.get('http://www.mocky.io/v2/5e4a7e282f0000490097d252');
}

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});

app.get('/hotelList', async (req, res) => {
  try {
    let { data: hotels } = await getAtalayaHotels();
    let { data: rooms } = await getAtalayaRooms();
    let { data: mealPlans } = await getAtalayaMealPlans();

    console.log(hotels);
    console.log(rooms);
    console.log(mealPlans);

  } catch (error) {
    console.error(error);
  }
});
