import { overpassApi, perimeter, timeout, computeQQVERequirement } from './qqveRequirements.js'

const getSports = async (lat, lon, userMark) => {
  const body =
  `[out:json][timeout:${timeout}];
  (
    node["leisure"="fitness_centre"](around:${perimeter},${lat},${lon});
    node["leisure"="fitness_station"](around:${perimeter},${lat},${lon});
    node["leisure"="horse_riding"](around:${perimeter},${lat},${lon});
    node["leisure"="pitch"](around:${perimeter},${lat},${lon});
    node["leisure"="sports_centre"](around:${perimeter},${lat},${lon});
    node["leisure"="swimming_pool"](around:${perimeter},${lat},${lon});
    node["leisure"="track"](around:${perimeter},${lat},${lon});
    node["club"="sport"](around:${perimeter},${lat},${lon});
    node["leisure"="sports_hall"](around:${perimeter},${lat},${lon});
    node["leisure"="golf_course"](around:${perimeter},${lat},${lon});
    node["landuse"="winter_sports"](around:${perimeter},${lat},${lon});
    node["sport"](around:${perimeter},${lat},${lon});
  );
  out body;`
  try {
    const res = await overpassApi.post("/interpreter", body)
    return computeQQVERequirement(userMark, res.data.elements.length)
  } catch (e) {
    console.log("getSports Error: " + e)
    return 0
  }
}

export default getSports