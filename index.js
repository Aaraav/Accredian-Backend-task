const express = require('express');
const cors = require('cors');
const indexRouter = require('./views/server'); 
const app = express();

const corsOptions = {
    origin: 'https://accredian-frontend-task-ashy.vercel.app',
    optionsSuccessStatus: 200 
  };
app.use(express.json()); 
app.use('/api/user', indexRouter); 


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Your backend is running on port ${PORT}`);
});
