import { overpassApi, perimeter, timeout, computeQQVERequirement } from './qqveRequirements.js'

const getWorshipPlaces = async (lat, lon, userMark) => {
  const body =
  `[out:json][timeout:${timeout}];
  (
    node["amenity"="place_of_worship"](around:${perimeter},${lat},${lon});
    node["building"="cathedral"](around:${perimeter},${lat},${lon});
    node["building"="chapel"](around:${perimeter},${lat},${lon});
    node["building"="church"](around:${perimeter},${lat},${lon});
    node["building"="kingdom_hall"](around:${perimeter},${lat},${lon});
    node["building"="mosque"](around:${perimeter},${lat},${lon});
    node["building"="synagogue"](around:${perimeter},${lat},${lon});
    node["office"="religion"](around:${perimeter},${lat},${lon});
  );
  out body;`
  try {
    const res = await overpassApi.post("/interpreter", body)
    return computeQQVERequirement(userMark, res.data.elements.length)
  } catch (e) {
    console.log("getWorshipPlaces Error: " + e)
    return 0
  }
}

export default getWorshipPlaces