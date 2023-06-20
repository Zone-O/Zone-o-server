import { overpassApi, perimeter, timeout, computeQQVERequirement } from './qqveRequirements.js';

const getFoodServices = async (lat, lon, userMark) => {
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
    const res = await overpassApi.post("/interpreter", body)
    return computeQQVERequirement(userMark, res.data.elements.length)
  } catch (e) {
    console.log("getFoodServices Error: " + e)
    return 0
  }
}

export default getFoodServices