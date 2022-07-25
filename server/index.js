// newUser
//0rQfUS6zuvCjbcEA
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const app = express();
var path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
// Routes
const userRoutes = require('./api/celebrityRoutes');
// const adminRoutes = require('./api/adminRoutes');

app.use('/celebrities', userRoutes);
// app.use('/admin', adminRoutes);

// app.use(express.static(path.join(__dirname, 'www')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'www/index.html'));
// });


//  mongodb+srv://newUser:<password>@cluster0.qcyjq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(process.env.MONGODB, { useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`app running on port ${port} and connected with db`)
        })
    }).catch(err => console.log(err))