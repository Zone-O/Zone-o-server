import { overpassApi, perimeter, timeout, computeQQVERequirement } from './qqveRequirements.js'

const getParkings = async (lat, lon, userMark) => {
  const body =
  `[out:json][timeout:${timeout}];
  (
    node["amenity"="parking"](around:${perimeter},${lat},${lon});
    node["building"="parking"](around:${perimeter},${lat},${lon});
  );
  out body;`
  try {
    const res = await overpassApi.post("/interpreter", body)
    return computeQQVERequirement(userMark, res.data.elements.length)
  } catch (e) {
    console.log("getParkings Error: " + e)
    return 0
  }
}

export default getParkings