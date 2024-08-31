import BaseController from './BaseController.js'
import DataModel from '../models/DataModel.js'


export default class DataController extends BaseController {
    constructor() {
        super(DataModel)
    }
}

