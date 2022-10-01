import _ from 'lodash';

import getHotelList from './hotelList.js';

function getCheapestRoom(hotels, city, mealPlan) {
  return hotels
    .filter(hotel => hotel.city === city)
    .map(hotel => ({
      code: hotel.code,
      name: hotel.name,
      city: hotel.city,
      room: hotel.rooms
        .filter(room => room.meal_plan === mealPlan)
        .reduce((prev, curr) => prev.price < curr.price ? prev : curr)
    }))
    .reduce((prev, curr) => prev.room.price < curr.room.price ? prev : curr);
}

function getBestRoom(hotels, maxPrice, city) {
  return hotels
    .filter(hotel => hotel.city === city)
    .map(hotel => ({
      code: hotel.code,
      name: hotel.name,
      city: hotel.city,
      room: hotel.rooms
        .reduce((prev, curr) => ((prev.price > curr.price) && prev.price <= maxPrice) ? prev : curr)
    }))
    .reduce((prev, curr) => ((prev.room.price > curr.price) && prev.room.price <= maxPrice) ? prev : curr);
}

function planXNights(hotel, pax, nights) {
  return {
    ...hotel,
    room: {
      ...hotel.room,
      price: hotel.room.price * pax * nights,
      nights
    }
  };
}

export default async function getItinerary() {
  const pax = 2;
  const nightsCancun = 5;
  const nightsMalaga = 3;
  const hotels = await getHotelList();
  //Se obtiene la habitación más barata en cancún en régimen de alojamiento y desayuno, ya que saldrán a almorzar y cenar fuera
  const cheapestRoom = getCheapestRoom(hotels, 'Cancun', 'Alojamiento y desayuno');
  //Se obtiene el precio Total del itinerario según el nº de personas y las noches
  const cancunHotel = planXNights(cheapestRoom, pax, nightsCancun);
  const cancunPrice = cancunHotel.room.price;
  //Se obtiene el precio máximo por persona y noche para cubrir el resto del presupesto una vez obtenido el itinerario de Cancún
  const maxPricePax = (700 - cancunPrice) / (pax * nightsMalaga);
  //Se obtiene la habitación más barata que cumpla con el precio máximo por persona y noeche
  const bestRoom = getBestRoom(hotels, maxPricePax, 'Malaga');
  //Se obtiene el precio Total del itinerario según el nº de personas y las noches
  const malagaHotel = planXNights(bestRoom, pax, nightsMalaga)
  return _.concat(cancunHotel, malagaHotel);
};