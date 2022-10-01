import _ from 'lodash';

import getAtalayaHotelsData from './atalaya.js';
import getResortHotelsData from './resort.js';

export default async function getHotelList() {
  //Se obtienen los datos de los Hoteles Atayala
  const atalayaHotels = await getAtalayaHotelsData();
  //Se obtienen los datos de los Hoteles Resort
  const resortHotels = await getResortHotelsData();
  //Se concatenan ambos resultados
  return _.concat(atalayaHotels, resortHotels);
}