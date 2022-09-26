//Enum para unificar los tipos de habitación
const roomTypes = Object.freeze({
    mySt: "Estándar",
    mySu: "Suite"
});

//Convertir los tipos de Habitación de Atayala
export function atalayaConvertRoomType(atalayaRoomType) {
  const map = {
    standard: "mySt",
    suite: "mySu",
  }
  const roomType = map[atalayaRoomType];
  return roomTypes[roomType];
}

//Convertir los tipos de Habitación de Resort
export function resortConvertRoomType(resortRoomType) {
  const map = {
    st: "mySt",
    su: "mySu",
  }
  const roomType = map[resortRoomType];
  return roomTypes[roomType];
}

export default roomTypes; 