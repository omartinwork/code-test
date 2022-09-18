import axios from 'axios';
import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});

app.get('/hotelList', async (req, res) => {
  try {
    const { data } = await axios.get('http://www.mocky.io/v2/5e4a7e4f2f00005d0097d253');
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});
