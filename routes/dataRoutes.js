const express = require('express');
const DataController = require('../controllers/dataController');

const router = express.Router();

// Routes CRUD operations
router.post('/records', DataController.create);
router.get('/records', DataController.getAll);
router.get('/records/:id', DataController.getById);
router.put('/records/:id', DataController.update);
router.delete('/records/:id', DataController.delete);

module.exports = router;






