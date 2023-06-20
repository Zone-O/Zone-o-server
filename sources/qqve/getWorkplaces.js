import { overpassApi, perimeter, timeout, computeQQVERequirement } from './qqveRequirements.js'

const getWorkplaces = async (lat, lon, userMark) => {
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
    const res = await overpassApi.post("/interpreter", body)
    return computeQQVERequirement(userMark, res.data.elements.length)
  } catch (e) {
    console.log("getWorkplaces Error: " + e)
    return 0
  }
}

export default getWorkplaces