import express from 'express';
import DataController from '../controllers/DataController.js';

export default class DataRoutes {
    constructor() {
        this.router = express.Router();
        this.dataController = new DataController(); // Initialize DataController
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/records', this.dataController.create.bind(this.dataController));
        this.router.get('/records', this.dataController.getAll.bind(this.dataController));
        this.router.get('/records/:id', this.dataController.getById.bind(this.dataController));
        this.router.put('/records/:id', this.dataController.update.bind(this.dataController));
        this.router.delete('/records/:id', this.dataController.delete.bind(this.dataController));
    }

}

