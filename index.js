const express = require('express');
const cors = require('cors');
const indexRouter = require('./views/server'); // Assuming index.js is in the same directory
// const referalRouter=require('../backend/views/index2');
const app = express();

app.use(cors({
    origin: 'https://accredian-frontend-task-ashy.vercel.app/'
}));
app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/api/user', indexRouter); // Mount the routes from index.js
// app.use('/api/referal',referalRouter);


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Your backend is running on port ${PORT}`);
});
