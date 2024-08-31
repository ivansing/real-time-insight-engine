import express from 'express';
import bodyParser from'body-parser';
import Database from'../config/db.js';
// import DataRoutes from'../routes/DataRoutes.js';
import cors from'cors';
import 'dotenv-flow/config'
import diContainer from '../config/di-container.js';

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
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ error: 'Something went wrong!'})
        })
    }

    initializeRoutes() {
        // const dataRoutes = new DataRoutes();
        const dataRoutes = diContainer.getDataRoutes();
        this.app.use('/api', dataRoutes.router);
    }

    async start() {
        try {
            // await this.database.connect();
            await diContainer.getDatabase().connect();
            this.app.listen(this.port, () => {
                console.log(`Server running on port ${this.port}`)
            })
        } catch (error) {
            console.error('Failed to start the server:', error)
        }
    }
}

