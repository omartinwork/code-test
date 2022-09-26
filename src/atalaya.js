import axios from 'axios';
import _ from 'lodash';

import { atalayaConvertRoomType } from './roomTypes.js';
import { atalayaConvertMealPlan } from './mealPlans.js';


//Se obtienen las habitaciones
async function getAtalayaRooms() {
  const {
    data
  } = await axios.get('https://run.mocky.io/v3/132af02e-8beb-438f-ac6e-a9902bc67036');

  return data.rooms_type.reduce((objRoom, myRoomType) => {
    const {
      code,
      name
    } = myRoomType;
    objRoom[code] = name;
    
    return objRoom;
  }, {});
}

//Se obtienen los regímenes
async function getAtalayaMealPlans(roomNames) {
  const {
    data
  } = await axios.get('http://www.mocky.io/v2/5e4a7e282f0000490097d252');

  //Regímenes por Hotel
  const mpByHotel = data.meal_plans.reduce((obj, myPlan) => {
    //
    Object.entries(myPlan.hotel).forEach((entry) => {
      const [hotelCode, hotelRooms] = entry;
      if (!_.has(obj, hotelCode)) {
        obj[hotelCode] = [];
      }
      
      hotelRooms.forEach(({
        room,
        price
      }) => {
        const m = {
          name: roomNames[room],
          room_type: atalayaConvertRoomType(room),
          meal_plan: atalayaConvertMealPlan(myPlan.code),
          price: price,
        };
        obj[hotelCode].push(m);
      });
    });
    return obj;
}, {});

  return mpByHotel;
}

async function getAtalayaHotels(mpByHotel) {
  const {
    data
  } = await axios.get('http://www.mocky.io/v2/5e4a7e4f2f00005d0097d253');

  return data.hotels.map((hotel) => {
    hotel.rooms = mpByHotel[hotel.code];
    return hotel;
  });
}

export default async function getAtalayaHotelsData() {
  const roomNames = await getAtalayaRooms();
  const mpByHotel = await getAtalayaMealPlans(roomNames);
  const hotels = await getAtalayaHotels(mpByHotel);
  return hotels;
}