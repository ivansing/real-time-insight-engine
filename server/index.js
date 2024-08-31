import express from 'express';
import bodyParser from'body-parser';
import Database from'../config/db.js';
import DataRoutes from'../routes/DataRoutes.js';
import cors from'cors';



export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.database = new Database();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    initializeRoutes() {
        const dataRoutes = new DataRoutes();
        this.app.use('/api', dataRoutes.router);
    }

    async start() {
        try {
            await this.database.connect();
            this.app.listen(this.port, () => {
                console.log(`Server running on port ${this.port}`)
            })
        } catch (error) {
            console.error('Failed to start the server:', error)
        }
    }
}

