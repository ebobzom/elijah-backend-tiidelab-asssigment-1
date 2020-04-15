const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const users = require('./users-data');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());

app.get('/users', (req, res)=> {

    res.status(200).json(users);
});

app.listen(port, (err) => {
    if(err){
        return err.message;
    }else{
        console.log(`server running on port ${port}`);
    }
})