import BaseController from '../controllers/BaseController.js';

// Mock Model class for testing
class MockModel {
    async createRecord(key, value) {
        return { id: 1, key, value };
    }

    async getAllRecords() {
        return [{ id: 1, key: 'testKey', value: 'testValue' }];
    }

    async getRecordById(id) {
        return id === '1' ? { id: 1, key: 'testKey', value: 'testValue' } : null;
    }

    async updateRecord(id, key, value) {
        return id === '1' ? { id: 1, key, value } : null;
    }

    async deleteRecord(id) {
        return id === '1' ? { id: 1, key: 'testKey', value: 'testValue' } : null;
    }
}

// Simulate request and response objects
const mockReq = (body = {}, params = {}) => ({ body, params });
const mockRes = () => {
    const res = {};
    res.status = (status) => {
        res.statusCode = status;
        return res;
    };
    res.json = (data) => {
        res.jsonData = data;
        return res;
    };
    return res;
};

// Test BaseController
const mockModel = new MockModel();
const baseController = new BaseController(mockModel);

(async () => {
    // Test create
    const reqCreate = mockReq({ key: 'testKey', value: 'testValue' });
    const resCreate = mockRes();
    await baseController.create(reqCreate, resCreate);
    console.log('Create Test:', resCreate.statusCode, resCreate.jsonData);

    // Test getAll
    const reqGetAll = mockReq();
    const resGetAll = mockRes();
    await baseController.getAll(reqGetAll, resGetAll);
    console.log('GetAll Test:', resGetAll.statusCode, resGetAll.jsonData);

    // Test getById
    const reqGetById = mockReq({}, { id: '1' });
    const resGetById = mockRes();
    await baseController.getById(reqGetById, resGetById);
    console.log('GetById Test:', resGetById.statusCode, resGetById.jsonData);

    // Test update
    const reqUpdate = mockReq({ key: 'updatedKey', value: 'updatedValue' }, { id: '1' });
    const resUpdate = mockRes();
    await baseController.update(reqUpdate, resUpdate);
    console.log('Update Test:', resUpdate.statusCode, resUpdate.jsonData);

    // Test delete
    const reqDelete = mockReq({}, { id: '1' });
    const resDelete = mockRes();
    await baseController.delete(reqDelete, resDelete);
    console.log('Delete Test:', resDelete.statusCode, resDelete.jsonData);
})();