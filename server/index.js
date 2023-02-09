// newUser
//0rQfUS6zuvCjbcEA


// RewriteOptions inherit
// # HTTPS forced

// <IfModule mod_rewrite.c>

// RewriteEngine On

// ErrorDocument 404 /index.html

// # ensure www.
// RewriteCond %{HTTP_HOST} !^www\. [NC]
// RewriteRule ^ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]


// RewriteCond %{HTTPS} off
// RewriteRule ^(.*)$ https://%{SERVER_NAME}%{REQUEST_URI} [R=301,L]
// Header always set Content-Security-Policy "upgrade-insecure-requests;"

//             RewriteEngine On
            
// # Redirect Public ports to NodeJS port
// RewriteEngine On
// RewriteRule ^$ http://localhost:5050/ [P,L]
// RewriteCond %{REQUEST_FILENAME} !-f
// RewriteCond %{REQUEST_FILENAME} !-d
// RewriteRule ^(.*)$ http://localhost:5050/$1 [P,L]

// </IfModule>

// <IfModule mod_dir.c>
//         DirectoryIndex 
// </IfModule>
// RewriteCond %{HTTPS} off
// RewriteCond %{HTTP:X-Forwarded-SSL} !on
// RewriteCond %{HTTP_HOST} ^newsfarmers\.com$ [OR]
// RewriteCond %{HTTP_HOST} ^www\.newsfarmers\.com$
// RewriteRule ^(.*)$ "https\:\/\/www\.newsfarmers\.com\/$1" [R=301,L]
// RewriteCond %{HTTP_HOST} ^newsfarmers\.com$ [OR]
// RewriteCond %{HTTP_HOST} ^www\.newsfarmers\.com$



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 5050;
const app = express();
var path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
// Routes
const newsRoutes = require('./api/newsRoutes');
const celebrityRoutes = require('./api/celebrityRoutes');

app.use('/api/News', newsRoutes);
app.use('/api/Celebrity', celebrityRoutes);

app.use(express.static(path.join(__dirname, 'www')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'www/index.html'));
});


//  mongodb+srv://newUser:<password>@cluster0.qcyjq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(process.env.MONGODB, { useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`app running on port ${port} and connected with db`)
        })
    }).catch(err => console.log(err))