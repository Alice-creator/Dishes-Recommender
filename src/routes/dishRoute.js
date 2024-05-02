const express = require('express')
const router = express.Router()
const dishController = require('../controllers/dishController')

router.post('/dishesList', dishController.DishesListByIngredient)
router.post('/newIngredient', dishController.CreateNewIngredient)
router.post('/newDish', dishController.CreateDish)
module.exports = router
