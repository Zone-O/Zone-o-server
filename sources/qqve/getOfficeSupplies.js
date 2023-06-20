import { overpassApi, perimeter, timeout, computeQQVERequirement } from './qqveRequirements.js'

const getOfficeSupplies = async (lat, lon, userMark) => {
  const body =
  `[out:json][timeout:${timeout}];
  (
    node["amenity"="library"](around:${perimeter},${lat},${lon});
    node["amenity"="toy_library"](around:${perimeter},${lat},${lon});
    node["amenity"="bank"](around:${perimeter},${lat},${lon});
    node["shop"="department_store"](around:${perimeter},${lat},${lon});
    node["shop"="kiosk"](around:${perimeter},${lat},${lon});
    node["shop"="mall"](around:${perimeter},${lat},${lon});
    node["shop"="wholesale"](around:${perimeter},${lat},${lon});
    node["shop"="boutique"](around:${perimeter},${lat},${lon});
    node["shop"="clothes"](around:${perimeter},${lat},${lon});
    node["shop"="fashion_accessories"](around:${perimeter},${lat},${lon});
    node["shop"="jewelry"](around:${perimeter},${lat},${lon});
    node["shop"="shoes"](around:${perimeter},${lat},${lon});
    node["shop"="watches"](around:${perimeter},${lat},${lon});
    node["shop"="second_hand"](around:${perimeter},${lat},${lon});
    node["shop"="variety_store"](around:${perimeter},${lat},${lon});
    node["shop"="beauty"](around:${perimeter},${lat},${lon});
    node["shop"="chemist"](around:${perimeter},${lat},${lon});
    node["shop"="cosmetics"](around:${perimeter},${lat},${lon});
    node["shop"="hairdresser"](around:${perimeter},${lat},${lon});
    node["shop"="hairdresser_supply"](around:${perimeter},${lat},${lon});
    node["shop"="hearing_aids"](around:${perimeter},${lat},${lon});
    node["shop"="massage"](around:${perimeter},${lat},${lon});
    node["shop"="optician"](around:${perimeter},${lat},${lon});
    node["shop"="perfumery"](around:${perimeter},${lat},${lon});
    node["shop"="tatoo"](around:${perimeter},${lat},${lon});
    node["shop"="appliance"](around:${perimeter},${lat},${lon});
    node["shop"="bathroom_furnishing"](around:${perimeter},${lat},${lon});
    node["shop"="doityourself"](around:${perimeter},${lat},${lon});
    node["shop"="electrical"](around:${perimeter},${lat},${lon});
    node["shop"="florist"](around:${perimeter},${lat},${lon});
    node["shop"="garden_centre"](around:${perimeter},${lat},${lon});
    node["shop"="garden_furniture"](around:${perimeter},${lat},${lon});
    node["shop"="hardware"](around:${perimeter},${lat},${lon});
    node["shop"="houseware"](around:${perimeter},${lat},${lon});
    node["shop"="locksmith"](around:${perimeter},${lat},${lon});
    node["shop"="paint"](around:${perimeter},${lat},${lon});
    node["shop"="pottery"](around:${perimeter},${lat},${lon});
    node["shop"="antiques"](around:${perimeter},${lat},${lon});
    node["shop"="bed"](around:${perimeter},${lat},${lon});
    node["shop"="candles"](around:${perimeter},${lat},${lon});
    node["shop"="carpet"](around:${perimeter},${lat},${lon});
    node["shop"="furniture"](around:${perimeter},${lat},${lon});
    node["shop"="interior_decoration"](around:${perimeter},${lat},${lon});
    node["shop"="kitchen"](around:${perimeter},${lat},${lon});
    node["shop"="lighting"](around:${perimeter},${lat},${lon});
    node["shop"="computer"](around:${perimeter},${lat},${lon});
    node["shop"="electronics"](around:${perimeter},${lat},${lon});
    node["shop"="hifi"](around:${perimeter},${lat},${lon});
    node["shop"="mobile_phone"](around:${perimeter},${lat},${lon});
    node["shop"="telecommunication"](around:${perimeter},${lat},${lon});
    node["shop"="vacuum_cleaner"](around:${perimeter},${lat},${lon});
    node["shop"="atv"](around:${perimeter},${lat},${lon});
    node["shop"="bicycle"](around:${perimeter},${lat},${lon});
    node["shop"="car"](around:${perimeter},${lat},${lon});
    node["shop"="car_repair"](around:${perimeter},${lat},${lon});
    node["shop"="car_parts"](around:${perimeter},${lat},${lon});
    node["shop"="caravan"](around:${perimeter},${lat},${lon});
    node["shop"="fuel"](around:${perimeter},${lat},${lon});
    node["shop"="fishing"](around:${perimeter},${lat},${lon});
    node["shop"="hunting"](around:${perimeter},${lat},${lon});
    node["shop"="motorcycle"](around:${perimeter},${lat},${lon});
    node["shop"="outdoor"](around:${perimeter},${lat},${lon});
    node["shop"="sports"](around:${perimeter},${lat},${lon});
    node["shop"="swimming_pool"](around:${perimeter},${lat},${lon});
    node["shop"="trailer"](around:${perimeter},${lat},${lon});
    node["shop"="tyres"](around:${perimeter},${lat},${lon});
    node["shop"="art"](around:${perimeter},${lat},${lon});
    node["shop"="collector"](around:${perimeter},${lat},${lon});
    node["shop"="craft"](around:${perimeter},${lat},${lon});
    node["shop"="games"](around:${perimeter},${lat},${lon});
    node["shop"="music"](around:${perimeter},${lat},${lon});
    node["shop"="musical_instrument"](around:${perimeter},${lat},${lon});
    node["shop"="photo"](around:${perimeter},${lat},${lon});
    node["shop"="video"](around:${perimeter},${lat},${lon});
    node["shop"="video_games"](around:${perimeter},${lat},${lon});
    node["shop"="anime"](around:${perimeter},${lat},${lon});
    node["shop"="books"](around:${perimeter},${lat},${lon});
    node["shop"="lottery"](around:${perimeter},${lat},${lon});
    node["shop"="newsagent"](around:${perimeter},${lat},${lon});
    node["shop"="stationery"](around:${perimeter},${lat},${lon});
    node["shop"="ticket"](around:${perimeter},${lat},${lon});
    node["shop"="bookmaker"](around:${perimeter},${lat},${lon});
    node["shop"="cannabis"](around:${perimeter},${lat},${lon});
    node["shop"="copyshop"](around:${perimeter},${lat},${lon});
    node["shop"="e-cigarette"](around:${perimeter},${lat},${lon});
    node["shop"="funeral_directors"](around:${perimeter},${lat},${lon});
    node["shop"="money_lender"](around:${perimeter},${lat},${lon});
    node["shop"="outpost"](around:${perimeter},${lat},${lon});
    node["shop"="party"](around:${perimeter},${lat},${lon});
    node["shop"="pest_control"](around:${perimeter},${lat},${lon});
    node["shop"="pet"](around:${perimeter},${lat},${lon});
    node["shop"="pet_grooming"](around:${perimeter},${lat},${lon});
    node["shop"="religion"](around:${perimeter},${lat},${lon});
    node["shop"="tobacco"](around:${perimeter},${lat},${lon});
    node["shop"="toys"](around:${perimeter},${lat},${lon});
    node["shop"="travel_agency"](around:${perimeter},${lat},${lon});
  );
  out body;`
  try {
    const res = await overpassApi.post("/interpreter", body)
    return computeQQVERequirement(userMark, res.data.elements.length)
  } catch (e) {
    console.log("getOfficeSupplies Error: " + e)
    return 0
  }
}

export default getOfficeSupplies