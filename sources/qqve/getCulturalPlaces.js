import { overpassApi, perimeter, timeout, computeQQVERequirement } from './qqveRequirements.js'

const getCulturalPlaces = async (lat, lon, userMark) => {
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
    node["tourism"="theme_park"](around:${perimeter},${lat},${lon});
    node["tourism"="zoo"](around:${perimeter},${lat},${lon});
    node["sport"="climbing_adventure"](around:${perimeter},${lat},${lon});
  );
  out body;`
  try {
    const res = await overpassApi.post("/interpreter", body)
    return computeQQVERequirement(userMark, res.data.elements.length)
  } catch (e) {
    console.log("getCulturalPlaces Error: " + e)
    return 0
  }
};

export default getCulturalPlaces