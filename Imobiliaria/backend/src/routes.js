const express = require('express');

const crypto = require('crypto');

const routes = express.Router();

const RealEstateController= require('./controllers/RealEstateController')
const PropertyController= require('./controllers/PropertyController')
const ProfileController= require('./controllers/ProfileController')
const SessionController= require('./controllers/SessionController')

routes.post('/sessions', SessionController.create);

routes.get('/realestate', RealEstateController.index);
routes.post('/realestate', RealEstateController.create);

routes.get('/profile', ProfileController.index); 

routes.get('/property', PropertyController.index);
routes.post('/property', PropertyController.create);
routes.delete('/property/:id', PropertyController.delete);

module.exports = routes; 