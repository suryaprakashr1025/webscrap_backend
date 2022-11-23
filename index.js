const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const mongodb = require("mongodb")
const mongoclient = mongodb.MongoClient;
const URL = process.env.DB


const app = express()

app.use(cors({
        //origin: "http://localhost:3000",
        origin:"https://amazing-alfajores-e8a644.netlify.app"
}))

app.use(express.json())

app.post("/flipkart", async (req, res) => {
        try {
                //connect the database
                const connection = await mongoclient.connect(URL)
                //select the database
                const db = connection.db("webscrap")
                //select the collection
                //Do operation
                const product = await db.collection("product").insertOne(req.body)
                //close connection
                await connection.close()

                res.json({ message: "product created", id: product.insertedId })
        } catch (error) {
                res.status(500).json({ message: "something went wrong" })
        }

})


app.get("/webscrap/:productname", async (req, res) => {
        try {
                //connect the database
                const connection = await mongoclient.connect(URL)
                //select the database
                const db = connection.db("webscrap")
                //select the collection
                //Do operation
                

                const product = await db.collection("product").find({ product_name: req.params.productname }).toArray()
                //close connection
                await connection.close()
                res.json(product)
                // if (product) {
                //         res.json(product)
                // } else {
                //         res.status(404).json({ message: "product not found" })
                // }

        } catch (error) {
                res.status(500).json({ message: "something went wrong" })
        }
})


app.get("/webscrap", async (req, res) => {
        try {
                //connect the database
                const connection = await mongoclient.connect(URL)
                //select the database
                const db = connection.db("webscrap")
                //select the collection
                //Do operation
                const product = await db.collection("product").find({}).toArray()
                //close connection
                await connection.close()

                res.json(product)
        } catch (error) {
                res.status(500).json({ message: "something went wrong" })
        }
})

app.listen(process.env.PORT || 3008)

