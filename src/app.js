const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
require('./db/mongoose')


const guviRouter = require('./routes/guvirouter')
app.use(guviRouter)

app.listen(port, () => {
    console.log(`server on port ${port}`)
})