const express = require('express');
const cors = require('cors');
const indexRouter = require('./views/server'); 
const app = express();

const corsOptions = {
    origin: 'https://accredian-frontend-task-ashy.vercel.app', // Your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  };
  
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
app.use(express.json()); 
app.use('/api/user', indexRouter); 


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Your backend is running on port ${PORT}`);
});
