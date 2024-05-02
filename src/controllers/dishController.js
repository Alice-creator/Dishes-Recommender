require('dotenv').config({path:'../.env'})
const returnObjet = require('../utils/returnObject')
const database = require('../utils/database')
const client = require('pg')
const returnObject = require('../utils/returnObject')

class dishes{
    DishesListByIngredient = async (req, res)=>{
        let ingredientList = req.body.data
        let ingredientString = ' '
        // console.log(ingredientList)
        ingredientList.forEach(element => {
            ingredientString += element.name.toLowerCase() + ' '
        });
        return res.status(200).json(returnObjet(ingredientString, null))
    }

    CreateNewIngredient = async (req, res)=>{
        try{
            let ingredient = req.body
            let connection = database.connectDB(process.env.database)
            await connection.connect()
            await connection.query(`INSERT INTO ingredient(name, icon)
            VALUES('${ingredient.name}', '${ingredient.icon}')`)
            connection.end()
            return res.status(200).json(returnObject(null, null, 'successfully create new ingredient'))
        }catch(err){
            return res(400).json(returnObject(null, err, "I don't know what's going on"))
        }
    }

    CreateDish = async (req, res)=>{
        try{
            let connection = database.connectDB(process.env.database)
            let dish = req.body
            let ingredientList = dish.ingredients
            console.log(dish)
            await connection.connect()
            await connection.query(`INSERT INTO dish(name, intro, recipe, author)
            VALUES('${dish.name}', '${dish.intro}', '${dish.recipe}', '${dish.author}')`)
            // console.log('here')
            let dishID = await connection.query(`SELECT id FROM ingredient
                                                ORDER BY time_created DESC
                                                LIMIT 1;`)
            if(dishID.rows){
                console.log(dishID.rows)
                dishID = dishID.rows[0].id
            }
            console.log(dishID)
            await new Promise((resolve, reject)=>{
                try{
                    //    let connection = this.connectDB(process.env.database) 
                       ingredientList.forEach(ingredient => connection.query(`INSERT INTO ingredientofdish(dishID, ingredientID)
                       VALUES('${dishID}', '${ingredient.ID}')`))
                    }catch(err){
                        return err
                    }
            }).then(()=>{
                connection.end()
            })                                                
            return res.status(200).json(returnObject(null, null, "oke"))
        }catch(err){
            return res.status(400).json(returnObject(null, err, "Error in creating dish"))
        }
    }

    GetTrendingDishes = async (req, res)=>{

    }

    GetDishByID = async (req, res)=>{

    }

    GetDishesByName = async (req, res)=>{

    }

    RateDishByID = async (req, res)=>{

    }

}

module.exports = new dishes