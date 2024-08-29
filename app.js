const express = require('express');
const connectDB = require('./config/db')
const dataRoutes = require('./routes/dataRoutes');

const app = express()

// Middlewares
app.use(express.json())
app.use('/api', dataRoutes);


connectDB()
   .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
   })
   .catch(error => {
    console.error('Failed to start the server:', error)
   })

