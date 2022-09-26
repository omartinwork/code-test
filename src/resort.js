import axios from 'axios';
import express from 'express';
import cors from 'cors';
import _ from 'lodash';

import {
  resortConvertRoomType
} from './roomTypes.js';
import {
  resortConvertMealPlan
} from './mealPlans.js';

//Se obtiene la información de los hoteles y sus regímenes
async function getResortHotels() {
    const {
        data
        } = await axios.get('http://www.mocky.io/v2/5e4e43272f00006c0016a52b');

        const {
        data: myMealPlans
        } = await axios.get('http://www.mocky.io/v2/5e4a7dd02f0000290097d24b');

        //Mapeamos los Hoteles y las habitaciones de dichos Hoteles
        const myHotels = data.hotels.map((myHotel) => {
        const roomsInfo = myHotel.rooms.map((room) => {
            const myPlan = myMealPlans.regimenes.find((plan) => plan.hotel === myHotel.code && plan.room_type === room.code);

            return {
            name: room.name,
            room_type: resortConvertRoomType(room.code),
            meal_plan: resortConvertMealPlan(myPlan.code),
            price: myPlan.price,
            }
        });
        return {
            code: myHotel.code,
            name: myHotel.name,
            city: myHotel.location,
            rooms: roomsInfo,
        };
    });
     return myHotels;
}

export default async function getResortHotelsData() {
  const hotels = await getResortHotels();
  return hotels;
}