//Enum para los tipos de regímenes
const mealPlans = Object.freeze({
    myPc: "Pensión Completa",
    myMp: "Media Pensión",
    mySa: "Alojamiento", 
    myAd: "Alojamiento y desayuno",
});

//Convertir los tipos de Regímenes de Atayala
export function atalayaConvertMealPlan(atalayaMealPlan) {
  const map = {
    pc: "myPc",
    mp: "myMp",
    sa: "mySa", 
    ad: "myAd"
  }
  const mealPlan = map[atalayaMealPlan];
  return mealPlans[mealPlan];
}

//Convertir los tipos de Regímenes de Resort
export function resortConvertMealPlan(resortMealPlan) {
  const map = {
    pc: "myPc",
    mp: "myMp",
    sa: "mySa", 
    ad: "myAd"
  }
  const mealPlan = map[resortMealPlan];
  return mealPlans[mealPlan];
}

export default mealPlans;