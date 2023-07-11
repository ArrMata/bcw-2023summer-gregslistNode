import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class HousesService {

    async getHouses() {
        const houses = await dbContext.Houses.find()
        return houses
    }

    async createHouse(houseData) {
        const house = await dbContext.Houses.create(houseData)
        return house
    }

    async getHouseById(houseId) {
        const foundHouse = await dbContext.Houses.findById(houseId)
        if (!foundHouse) {
            throw new BadRequest(`Unable to find house with id: ${houseId}`)
        }
        return foundHouse
    }

    async removeHouse(uid, houseId) {
        const foundHouse = await this.getHouseById(houseId)
        if (foundHouse.creatorId.toString() != uid)
            throw new Forbidden('You are not the owner of this house.')
        foundHouse.delete()
        return foundHouse
    }

    async updateHouse(uid, houseId, houseData) {
        const foundHouse = await this.getHouseById(houseId)
        if (foundHouse.creatorId.toString() != uid)
            throw new Forbidden('You are not the owner of this house.')
        foundHouse.bedrooms = houseData.bedrooms || foundHouse.bedrooms
        foundHouse.bathrooms = houseData.bathrooms || foundHouse.bathrooms
        foundHouse.levels = houseData.levels || foundHouse.levels
        foundHouse.imgUrl = houseData.imgUrl || foundHouse.imgUrl
        foundHouse.year = houseData.year || foundHouse.year
        foundHouse.price = houseData.price || foundHouse.price
        foundHouse.description = houseData.description || foundHouse.description
        foundHouse.save()
        return foundHouse
    }
}

export const housesService = new HousesService()