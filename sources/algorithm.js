import express from 'express';
import axios from 'axios'
import fs from 'fs'
import { getQQVERequirements } from './qqve/qqveRequirements.js';

let apartsInCity = []

const getApartsInCity = async (city) => {
  const urlNominatimApi = "https://nominatim.openstreetmap.org/search?format=json&q="
  let res;
  try {
    res = await axios.get(urlNominatimApi+city+", France")
  } catch (e) {
    throw new Error("Network Error")
  }
  if (res.data.length == 0)
    throw new Error("Sorry there is no data available for this city")
  const minLat = parseFloat(res.data[0].boundingbox[0])
  const maxLat = parseFloat(res.data[0].boundingbox[1])
  const minLon = parseFloat(res.data[0].boundingbox[2])
  const maxLon = parseFloat(res.data[0].boundingbox[3])

  let announceLat;
  let announceLon;
  const content = fs.readFileSync("assets/annonces.json")
  const announces = JSON.parse(content.toString())
  announces.forEach ((announce) => {
    announceLat = parseFloat(announce.lat)
    announceLon = parseFloat(announce.lon)
    if ((minLat <= announceLat && announceLat <= maxLat) &&
    (minLon <= announceLon && announceLon <= maxLon)) {
      apartsInCity.push(announce)
    }
  })
}

try {
  await getApartsInCity("Nantes")
  await getQQVERequirements(apartsInCity)
  console.log(JSON.stringify(apartsInCity, null, "\t"))
} catch (e) {
  console.log(e)
}