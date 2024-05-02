require('dotenv').config({ path: '../.env' })
const { Client } = require('pg')
const fs = require('fs').promises

async function connectDB() {
    const client = new Client({
        user: process.env.user,
        host: process.env.host,
        database: 'postgres',
        password: process.env.DB_password,
        port: process.env.DB_port
    })

    const DishesRecommender = new Client({
        user: process.env.user,
        host: process.env.host,
        database: process.env.database,
        password: process.env.DB_password,
        port: process.env.DB_port
    })

    try {
        await client.connect()
        const result = await client.query(`SELECT * FROM pg_catalog.pg_database WHERE datname = '${process.env.database}'`)

        if (result.rows.length > 0 && result.rows[0].datname === process.env.database) {
            console.log(`Database ${process.env.database} already exists.`)
        } else {
            await client.query(`CREATE DATABASE ${process.env.database}`)
            console.log(`Database ${process.env.database} created.`)

            const DishesRecommender = new Client({
                user: process.env.user,
                host: process.env.host,
                database: process.env.database,
                password: process.env.DB_password,
                port: process.env.DB_port
            })
    
            await DishesRecommender.connect()
            const sql = await fs.readFile('../resources/dishes_recommender.pgsql', 'utf-8')
            await DishesRecommender.query(sql)
    
            const datafile = JSON.parse(await fs.readFile('../resources/basic_ingredients.json', 'utf-8'))
            for (let file of datafile) {
                await DishesRecommender.query(`INSERT INTO ingredient(NAME, ICON) VALUES('${file.name.toLowerCase()}', '${file.icon}')`)
            }
            
            console.log('Ingredients added to database.')
        }

        await client.end()

    } catch (error) {
        console.error('Error in database operation:', error)
    } finally {
        await DishesRecommender.end()
        console.log('Database connection closed.')
    }
}

module.exports = connectDB
