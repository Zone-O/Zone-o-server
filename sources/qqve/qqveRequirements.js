import axios from 'axios'
import getEssentials from './getEssentials.js'
import getWorkplaces from './getWorkplaces.js'
import getFoodServices from './getFoodServices.js'
import getCulturalPlaces from './getCulturalPlaces.js'
import getTransports from './getTransports.js'
import getSports from './getSports.js'
import getNaturalPlaces from './getNaturalPlaces.js'
import getOfficeSupplies from './getOfficeSupplies.js'
import getMedicalServices from './getMedicalServices.js'
import getParkings from './getParkings.js'
import getWorshipPlaces from './getWorshipPlaces.js'

export const overpassApi = axios.create({
  baseURL: "https://overpass-api.de/api"
})
export const perimeter = 1000
export const timeout = 80

let qqveRequirementMark = 0;
let finalMark = 0;

const userMark = 5

export const computeQQVERequirement = (userMark, resNumber) => {
  if (1 <= resNumber && resNumber <= 5)
    qqveRequirementMark = 1
  else if (6 <= resNumber && resNumber <= 10)
    qqveRequirementMark = 2
  else if (11 <= resNumber && resNumber <= 15)
    qqveRequirementMark = 3
  else if (16 <= resNumber && resNumber <= 20)
    qqveRequirementMark = 4
  else if (20 < resNumber)
    qqveRequirementMark = 5
  else
    qqveRequirementMark = 0
  return (userMark * qqveRequirementMark) / 5
}

export const getQQVERequirements = async (apartsInCity) => {
  try {
    for (const [index, apart] of apartsInCity.entries()) {
      const values = await Promise.all(
        [getEssentials(apart.lat, apart.lon, userMark), getWorkplaces(apart.lat, apart.lon, userMark),
        getFoodServices(apart.lat, apart.lon, userMark), getCulturalPlaces(apart.lat, apart.lon, userMark),
        getTransports(apart.lat, apart.lon, userMark), getSports(apart.lat, apart.lon, userMark),
        getNaturalPlaces(apart.lat, apart.lon, userMark), getOfficeSupplies(apart.lat, apart.lon, userMark),
        getMedicalServices(apart.lat, apart.lon, userMark), getParkings(apart.lat, apart.lon, userMark),
        getWorshipPlaces(apart.lat, apart.lon, userMark)]
      )
      for (const value of values) {
        finalMark = finalMark + value
      }
      finalMark = finalMark / values.length
      apartsInCity[index] = {...apart, finalMark: finalMark}
      finalMark = 0
    }
  } catch (e) {
    throw e
  }
}
