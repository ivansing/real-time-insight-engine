import DataModel from '../models/DataModel.js';
const dataModel = new DataModel();

export default class TestModel {
    async testGetAll() {
        try {
            const records = await dataModel.getAllRecords();
            console.log('Records', records)
        } catch (error) {
            console.error('Error:', error)
        }
    }
}

const testModel = new TestModel();
console.log(testModel.testGetAll());
