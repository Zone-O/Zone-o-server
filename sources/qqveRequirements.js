import axios from 'axios'

const urlOverpassApi = "https://overpass-api.de/api/interpreter"
const perimeter = 1000
const timeout = 80
let qqveElementsTmp;
let qqveElementsByAparts = []

const getEssentials = async (lat, lon) => {
  const body =
  `[out:json][timeout:${timeout}];
  (
    node["amenity"="clinic"](around:${perimeter},${lat},${lon});
    node["amenity"="dentist"](around:${perimeter},${lat},${lon});
    node["amenity"="doctors"](around:${perimeter},${lat},${lon});
    node["amenity"="hospital"](around:${perimeter},${lat},${lon});
    node["amenity"="nursing_home"](around:${perimeter},${lat},${lon});
    node["amenity"="pharmacy"](around:${perimeter},${lat},${lon});
    node["amenity"="veterinary"](around:${perimeter},${lat},${lon});
    node["building"="supermarket"](around:${perimeter},${lat},${lon});
    node["shop"="bakery"](around:${perimeter},${lat},${lon});
    node["shop"="beverages"](around:${perimeter},${lat},${lon});
    node["shop"="butcher"](around:${perimeter},${lat},${lon});
    node["shop"="convenience"](around:${perimeter},${lat},${lon});
    node["shop"="greengrocer"](around:${perimeter},${lat},${lon});
    node["shop"="health_food"](around:${perimeter},${lat},${lon});
    node["shop"="supermarket"](around:${perimeter},${lat},${lon});
    node["shop"="herbalist"](around:${perimeter},${lat},${lon});
    node["shop"="medical_supply"](around:${perimeter},${lat},${lon});
    node["shop"="nutrition_supplements"](around:${perimeter},${lat},${lon});
    node["shop"="laundry"](around:${perimeter},${lat},${lon});
  );
  out body;`
  try {
    const res = await axios.post(urlOverpassApi, body)
    return {essentials: res.data.elements.length}
  } catch (e) {
    console.log("getEssentials Error: " + e)
    return {essentials: []}
  }
}

const getWorkplaces = async (lat, lon) => {
  const body =
  `[out:json][timeout:${timeout}];
  (
    node["amenity"="college"](around:${perimeter},${lat},${lon});
    node["amenity"="kindergarten"](around:${perimeter},${lat},${lon});
    node["amenity"="language_school"](around:${perimeter},${lat},${lon});
    node["amenity"="research_institute"](around:${perimeter},${lat},${lon});
    node["amenity"="music_school"](around:${perimeter},${lat},${lon});
    node["amenity"="school"](around:${perimeter},${lat},${lon});
    node["amenity"="university"](around:${perimeter},${lat},${lon});
    node["building"="school"](around:${perimeter},${lat},${lon});
    node["building"="university"](around:${perimeter},${lat},${lon});
  );
  out body;`
  try {
    const res = await axios.post(urlOverpassApi, body)
    return {workplaces: res.data.elements.length}
  } catch (e) {
    console.log("getWorkplaces Error: " + e)
    return {workplaces: []}
  }
}

const getFoodServices = async (lat, lon) => {
  const body =
  `[out:json][timeout:${timeout}];
  (
    node["amenity"="bar"](around:${perimeter},${lat},${lon});
    node["amenity"="biergarten"](around:${perimeter},${lat},${lon});
    node["amenity"="cafe"](around:${perimeter},${lat},${lon});
    node["amenity"="fast_food"](around:${perimeter},${lat},${lon});
    node["amenity"="food_court"](around:${perimeter},${lat},${lon});
    node["amenity"="pub"](around:${perimeter},${lat},${lon});
    node["amenity"="restaurant"](around:${perimeter},${lat},${lon});
  );
  out body;`
  try {
    const res = await axios.post(urlOverpassApi, body)
    return {foodServices: res.data.elements.length}
  } catch (e) {
    console.log("getFoodServices Error: " + e)
    return {foodServices: []}
  }
}

const getCulturalPlaces = async (lat, lon) => {
  const body =
  `[out:json][timeout:${timeout}];
  (
    node["amenity"="arts_center"](around:${perimeter},${lat},${lon});
    node["amenity"="casino"](around:${perimeter},${lat},${lon});
    node["amenity"="cinema"](around:${perimeter},${lat},${lon});
    node["amenity"="community_centre"](around:${perimeter},${lat},${lon});
    node["amenity"="conference_centre"](around:${perimeter},${lat},${lon});
    node["amenity"="events_venue"](around:${perimeter},${lat},${lon});
    node["amenity"="exhibition_centre"](around:${perimeter},${lat},${lon});
    node["amenity"="gambling"](around:${perimeter},${lat},${lon});
    node["amenity"="music_venue"](around:${perimeter},${lat},${lon});
    node["amenity"="nightclub"](around:${perimeter},${lat},${lon});
    node["amenity"="planetarium"](around:${perimeter},${lat},${lon});
    node["amenity"="theatre"](around:${perimeter},${lat},${lon});
    node["leisure"="adult_gaming_centre"](around:${perimeter},${lat},${lon});
    node["leisure"="amusement_arcade"](around:${perimeter},${lat},${lon});
    node["leisure"="escape_game"](around:${perimeter},${lat},${lon});
    node["leisure"="miniature_golf"](around:${perimeter},${lat},${lon});
    node["leisure"="swimming_area"](around:${perimeter},${lat},${lon});
    node["leisure"="swimming_pool"](around:${perimeter},${lat},${lon});
    node["leisure"="water_park"](around:${perimeter},${lat},${lon});
    node["tourism"="aquarium"](around:${perimeter},${lat},${lon});
    node["tourism"="attraction"](around:${perimeter},${lat},${lon});
    node["tourism"="gallery"](around:${perimeter},${lat},${lon});
    node["tourism"="museum"](around:${perimeter},${lat},${lon});
    node["tourism"="zoo"](around:${perimeter},${lat},${lon});
  );
  out body;`
  try {
    const res = await axios.post(urlOverpassApi, body)
    return {culturalPlaces: res.data.elements.length}
  } catch (e) {
    console.log("getCulturalPlaces Error: " + e)
    return {culturalPlaces: []}
  }
}

const getTransports = async (lat, lon) => {
  const body =
  `[out:json][timeout:${timeout}];
  (
    node["amenity"="bicycle_rental"](around:${perimeter},${lat},${lon});
    node["amenity"="boat_rental"](around:${perimeter},${lat},${lon});
    node["amenity"="boat_sharing"](around:${perimeter},${lat},${lon});
    node["amenity"="bus_station"](around:${perimeter},${lat},${lon});
    node["amenity"="ferry_terminal"](around:${perimeter},${lat},${lon});
    node["amenity"="taxi"](around:${perimeter},${lat},${lon});
    node["public_transport"="platform"](around:${perimeter},${lat},${lon});
    node["public_transport"="station"](around:${perimeter},${lat},${lon});
    node["public_transport"="stop_area"](around:${perimeter},${lat},${lon});
    node["railway"="station"](around:${perimeter},${lat},${lon});
    node["building"="train_station"](around:${perimeter},${lat},${lon});
    node["building"="transportation"](around:${perimeter},${lat},${lon});
    node["highway"="bus_stop"](around:${perimeter},${lat},${lon});
  );
  out body;`
  try {
    const res = await axios.post(urlOverpassApi, body)
    return {transports: res.data.elements.length}
  } catch (e) {
    console.log("getTransports Error: " + e)
    return {transports: []}
  }
}

export const getQQVERequirements = async (apartsInCity) => {
  try {
    for (const apart of apartsInCity) {
      const values = await Promise.all(
        [getEssentials(apart.lat, apart.lon), getWorkplaces(apart.lat, apart.lon),
        getFoodServices(apart.lat, apart.lon), getCulturalPlaces(apart.lat, apart.lon),
        getTransports(apart.lat, apart.lon)]
      )
      qqveElementsTmp = {...qqveElementsTmp, location: apart.location}
      values.forEach((value) => {
        qqveElementsTmp = {...qqveElementsTmp, ...value}
      })
      qqveElementsByAparts.push(qqveElementsTmp)
      qqveElementsTmp = undefined
    }
    console.log(qqveElementsByAparts)
  } catch (e) {
    throw e
  }
}
