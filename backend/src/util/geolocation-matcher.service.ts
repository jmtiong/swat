import { LatLong } from "@/model/models";
import { Injectable, Logger } from "@nestjs/common";
import { Area } from "@prisma/client";

class LocationMatch {
  closest: Area = null
  minDistance: number = null
}

@Injectable()
export class GeoLocationMatcherService {
  protected logger = new Logger(GeoLocationMatcherService.name)
  constructor () {}

  findClosest (listOfAreas: Area[], toMatch: LatLong) {
    const { closest, minDistance } = listOfAreas.reduce( (r, area) => {
      const o = new LatLong()
      o.lat = Number(area.lat)
      o.long = Number(area.long)
      const distance = this.haversineFormula(o, toMatch)
      if (distance < r.minDistance || !r.closest) {
        r.closest = area
        r.minDistance = distance
      }
      return r
    }, new LocationMatch())
    this.logger.log(`Closest Area: ${closest.name}, Lat: ${closest.lat}, Long: ${closest.long}. Parameter Lat: ${toMatch.lat}, Long: ${toMatch.long}`)
    this.logger.log(`Min Distance ${minDistance}`)

    return closest
  }

  private haversineFormula (destination: LatLong, toMatch: LatLong) {
    const { lat: latA, long: lonA } = destination
    const { lat: latB, long: lonB } = toMatch
    const {PI, sin, cos, atan2} = Math,
              r = PI/180,
              R = 6371,
              deltaLat = (latB - latA)*r,
              deltaLon = (lonB - lonA)*r,
              a = sin(deltaLat / 2)**2 + cos(latB*r)*cos(latA*r) * sin(deltaLon /2)**2,
              c = 2 * atan2(a**0.5, (1 - a)**0.5),
              d = R * c
        return d
  }
}