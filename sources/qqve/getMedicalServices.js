import { overpassApi, perimeter, timeout, computeQQVERequirement } from './qqveRequirements.js'

const getMedicalServices = async (lat, lon, userMark) => {
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
    node["shop"="medical_supply"](around:${perimeter},${lat},${lon});
    node["shop"="nutrition_supplements"](around:${perimeter},${lat},${lon});
    node["healthcare"](around:${perimeter},${lat},${lon});
  );
  out body;`
  try {
    const res = await overpassApi.post("/interpreter", body)
    return computeQQVERequirement(userMark, res.data.elements.length)
  } catch (e) {
    console.log("getMedicalServices Error: " + e)
    return 0
  }
}

export default getMedicalServices