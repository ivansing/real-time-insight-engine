import BaseModel from "../models/DataModel.js";
import ErrorHandling from "../utils/ErrorHandling.js";

export default class BaseController  {
    constructor() {
        this.model = new BaseModel();
    
    }
    async create(req, res) {
        try {
            const { key, value } = req.body;
            if(!key || !value) {
                return ErrorHandling.handleValidationError(res, 'Key and value are required')
            }

            
           

            const newRecord = await this.model.createRecord(key, value)
            res.status(201).json(newRecord);
        } catch (error) {
            if(error.message === 'Record with this key already exists') {
                return ErrorHandling.handleConflict(res, 'Record with this key already exists');
            } else {
                ErrorHandling.handleError(res, error, 'Failed to create record from controller')
            }
        }
    }

    async getAll(req, res) {
        try {
            const records = await this.model.getAllRecords();
            res.status(200).json(records);
        } catch (error) {
           ErrorHandling.handleError(res, error, 'Failed to retrieve records')
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const record = await this.model.getRecordById(id);
            if (record) {
                res.status(200).json(record);
            } else {
                ErrorHandling.handleNotFound(res, 'Record not found')
            }
        } catch (error) {
           ErrorHandling.handleError(res, error, 'Failed to retrieve record from controller')
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { key, value } = req.body;
            if(!key || !value) {
                ErrorHandling.handleValidationError(res, 'Key and value are required')
            }
            const record = await this.model.updateRecord(id, key, value);
            if (record) {
                res.status(200).json(record);
            } else {
                ErrorHandling.handleNotFound(res, 'Record not found')
            }
        } catch (error) {
            ErrorHandling.handleError(res, error, 'Failed to update record')
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            // Check if the record exiists before trying to delete
            const existingRecord = await this.model.getRecordById(id);
            if (!existingRecord) {
                ErrorHandling.handleNotFound(res, 'Record not found')
            }

            const record = await this.model.deleteRecord(id);
            if (record) {
                res.status(200).json({ message: 'Record deleted', record });
            } else {
                ErrorHandling.handleNotFound(res, 'Record not found')
            }
        } catch (error) {
            ErrorHandling.handleError(res, error, 'Failed to delete')
        }
    }
};






