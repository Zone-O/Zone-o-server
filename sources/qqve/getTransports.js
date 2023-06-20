import { overpassApi, perimeter, timeout, computeQQVERequirement } from './qqveRequirements.js'

const getTransports = async (lat, lon, userMark) => {
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
    const res = await overpassApi.post("/interpreter", body)
    return computeQQVERequirement(userMark, res.data.elements.length)
  } catch (e) {
    console.log("getTransports Error: " + e)
    return 0
  }
}

export default getTransports