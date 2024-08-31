import Database from "./db.js";
import DataModel from "../models/DataModel.js";
import DataController from "../controllers/DataController.js";
import DataRoutes from "../routes/DataRoutes.js";

class DIContainer {
    constructor() {
        this.database = new Database();
        this.dataModel = new DataModel(this.database);
        this.dataController = new DataController(this.dataModel);
        this.dataRoutes = new DataRoutes(this.dataController);
    }

    getDatabase() {
        return this.database;
    }

    getDataModel() {
        return this.dataModel;
    }

    getDataController() {
        return this.dataController;
    }

    getDataRoutes() {
        return this.dataRoutes;
    }
}

export default new DIContainer;


