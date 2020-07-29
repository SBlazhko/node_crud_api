const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();

const userRoutes = require('./routes/user');
const carRoutes = require('./routes/car');

const User = require('./models/user')
const Car = require('./models/car')

app.set('trust proxy', 1);

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', carRoutes);

app.use('/', (req, res, next) => {
    res.send('<h1>This is the test api app !!!</h1>')
});

Car.belongsTo(User);
User.hasMany(Car);

sequelize.sync().then(result => {
    app.listen(3000, () => {
        console.log(`Express server listening on port 3000!`)
    });
}).catch(err => {
    console.log(err);
});





