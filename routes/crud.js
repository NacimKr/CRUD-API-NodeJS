const express = require('express');
const router = express.Router();
const {create, read, update, deleted} = require('../controllers/crud.controller');
const authentification = require('../middlewares/authentification');
const multerImage = require('../middlewares/multerImage')

router.post('/create', authentification, multerImage, create);
router.get('/read', authentification, read);
router.put('/update/:id', authentification, multerImage, update);
router.delete('/delete/:id', authentification, multerImage, deleted);

module.exports = router;