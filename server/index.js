const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 9090;
const DIST_DIR = path.join(__dirname, '../build');
const indexHtmlFile = path.join(DIST_DIR, 'index.html');
app.use(express.static(DIST_DIR));

app.get('/*', (req, res) => {
    res.sendFile(indexHtmlFile);
   });

app.listen(port, function () {
 console.log('Leechbox serving on ' + port);
});