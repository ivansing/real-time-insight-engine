const DataModel = require('../models/dataModel');

const DataController = {
    async create(req, res) {
        try {
            const { key, value } = req.body;
            const record = await DataModel.createRecord(key, value);
            res.status(201).json(record);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create record from controller' });
        }
    },

    async getAll(req, res) {
        try {
            const records = await DataModel.getAllRecords();
            res.status(200).json(records);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve records' });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            console.log(`Fetching record with ID: ${id}`)
            const record = await DataModel.getRecordById(id);
            console.log(`Record found: ${JSON.stringify(record)}`)
            if (record) {
                res.status(200).json(record);
            } else {
                res.status(404).json({ error: 'Record not found' });
            }
        } catch (error) {
            console.error('Error in getById:', error)
            res.status(500).json({ error: 'Failed to retrieve record from controller' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { key, value } = req.body;
            const record = await DataModel.updateRecord(id, key, value);
            if (record) {
                res.status(200).json(record);
            } else {
                res.status(404).json({ error: 'Record not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update record' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const record = await DataModel.deleteRecord(id);
            if (record) {
                res.status(200).json({ message: 'Record deleted', record });
            } else {
                res.status(404).json({ error: 'Record not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete record' });
        }
    }
};

if(require.main === module) {
    const mockRequest = {params: {id: 4}};
    const mockResponse = {
        status: function (statusCode) {
            this.statusCode = statusCode
            return this;
        },
        json: function (data) {
            console.log(`Response:`, this.statusCode);
            console.log(`Response data:`, data)
        },
    };

    DataController.getById(mockRequest, mockResponse)
        .then(() => console.log(`getByID executed successfully`))
        .catch((error) => console.log('Error executing getById:', error));
}

module.exports = DataController;
