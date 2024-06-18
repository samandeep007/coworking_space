const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// create, find, update, delete
router.get('/ownerDashboard', userController.view);
router.post('/ownerDashboard', userController.find);
router.get('/addproperty', userController.form);
router.post('/addproperty', userController.create);
router.get('/coworkerDashboard', userController.show);
router.post('/coworkerDashboard', userController.finder);
router.get('/', userController.registerUser);
router.post('/register', userController.addUser);
router.get('/editproperty/:property_id', userController.edit);
router.post('/editproperty/:property_id', userController.update);
router.get('/:property_id', userController.delete);
router.get('/viewproperty/:property_id', userController.viewall);

module.exports = router;