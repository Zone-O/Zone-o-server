import { overpassApi, perimeter, timeout, computeQQVERequirement } from './qqveRequirements.js'

const getEssentials = async (lat, lon, userMark) => {
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
    node["shop"="dry_cleaning"](around:${perimeter},${lat},${lon});
    node["shop"="laundry"](around:${perimeter},${lat},${lon});
  );
  out body;`
  try {
    const res = await overpassApi.post("/interpreter", body)
    return computeQQVERequirement(userMark, res.data.elements.length)
  } catch (e) {
    console.log("getEssentials Error: " + e)
    return 0
  }
}

export default getEssentials