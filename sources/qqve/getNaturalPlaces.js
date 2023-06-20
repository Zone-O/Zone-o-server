import { overpassApi, perimeter, timeout, computeQQVERequirement } from './qqveRequirements.js'

const getNaturalPlaces = async (lat, lon, userMark) => {
  const body =
  `[out:json][timeout:${timeout}];
  (
    node["natural"](around:${perimeter},${lat},${lon});
    node["tourism"="picnic_site"](around:${perimeter},${lat},${lon});
    node["leisure"="dog_park"](around:${perimeter},${lat},${lon});
    node["leisure"="park"](around:${perimeter},${lat},${lon});
    node["leisure"="playground"](around:${perimeter},${lat},${lon});
  );
  out body;`
  try {
    const res = await overpassApi.post("/interpreter", body)
    return computeQQVERequirement(userMark, res.data.elements.length)
  } catch (e) {
    console.log("getNaturalPlaces Error: " + e)
    return 0
  }
}

export default getNaturalPlaces