require('dotenv').config({path:'../.env'})
const {Client} = require('pg')
const fs = require('fs').promises
const Jimp = require('jimp')
class Connection{
    static connectDB(database){
        return new Client({
            user: process.env.user,
            host: process.env.host,
            database: database,
            password: process.env.DB_password,
            port: process.env.DB_port
        })
    }

    static async insertIngredient(iconPath, width, height){
        return await Jimp.read(iconPath).then((image)=>{
            // console.log(iconPath)
            return image.resize(parseInt(width), parseInt(height)).getBufferAsync(Jimp.MIME_JPEG)
        })
    }

    static async insertIngredientToDish(connection, ingredientList, dishID){
        try{
        //    let connection = this.connectDB(process.env.database) 
           ingredientList.forEach(ingredient => connection.query(`INSERT INTO ingredientofdish(dishID, ingredientID)
           VALUES('${dishID}', '${ingredient.ID}')`))
        }catch(err){
            return err
        }
    }
}

module.exports = Connection