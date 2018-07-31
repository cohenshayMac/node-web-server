const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + 'public'));
app.use((req, res, next) => {
    const now = new Date().toString();
    const log =`${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append logs');
        }
    })
    next();
})

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear()
})

app.get('/about', (req, res) => {
    res.render("about.hbs", {
        pageTitle: 'Home Page',

    });
})

app.get('/', (req, res) => {
    res.render("home.hbs", {
        pageTitle: 'Home Page',
        welcomeMsg: 'welcome to the Main page'
    });
})





app.listen(port,() =>{
    console.log(`Server is up on port ${port}`);
});