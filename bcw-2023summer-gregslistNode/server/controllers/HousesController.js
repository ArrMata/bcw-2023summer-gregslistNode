import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService";
import BaseController from "../utils/BaseController";

export class HousesController extends BaseController {
    constructor() {
        super('api/houses')
        this.router
            .get('', this.getHouses)
            .get('/:houseId', this.getHouseById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createHouse)
            .put('/:houseId', this.updateHouse)
            .delete('/:houseId', this.removeHouse)
    }

    async getHouses(req, res, next) {
        try {
            res.send(await housesService.getHouses())
        } catch (error) {
            next(error)
        }
    }

    async getHouseById(req, res, next) {
        try {
            const houseId = req.params.houseId
            const house = await housesService.getHouseById(houseId)
            res.send(house)
        } catch (error) {
            next(error)
        }
    }


    async createHouse(req, res, next) {
        try {
            const uid = req.userInfo.id
            let houseData = req.body
            houseData.creatorId = uid
            res.send(await housesService.createHouse(houseData))
        } catch (error) {
            next(error)
        }
    }

    async removeHouse(req, res, next) {
        try {
            const uid = req.userInfo.id
            const houseId = req.params.houseId
            res.send(await housesService.removeHouse(uid, houseId))
        } catch (error) {
            next(error)
        }
    }

    async updateHouse(req, res, next) {
        try {
            const uid = req.userInfo.id
            const houseId = req.params.houseId
            const houseData = req.body
            res.send(await housesService.updateHouse(uid, houseId, houseData))
        } catch (error) {
            next(error)
        }
    }


}