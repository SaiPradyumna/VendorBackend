const express = require("express")
const dotEnv = require('dotenv')
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const vendorRoutes = require("./routes/vendor")
const bodyParser = require("body-parser")
const productRoutes = require("./routes/productRoutes")
const firmRoutes = require("./routes/firmRoutes")
const cors = require("cors")
const PORT = process.env.PORT || 4000
dotEnv.config()

app.use((cors()))

mongoose.connect(process.env.mongo_url)
    .then(() => console.log("Mongo db connected"))
    .catch((error) => console.log(error))

app.use(bodyParser.json())
app.use('/vendor', vendorRoutes)
app.use("/firm", firmRoutes)
app.use("/product", productRoutes)
app.use("/uploads", express.static('uploads'))


app.listen(PORT, () => {

    console.log(`Server started and running at ${PORT}`)
})
