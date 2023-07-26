require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

app.use(express.json());
app.use('/train', require('./routes/trains'))

app.get('/', (req,res) => {
    res.status(200).json({ message:"Server is running" })
})

app.listen(PORT, () => {
    console.log(`Server is running in the port ${PORT}`);
})