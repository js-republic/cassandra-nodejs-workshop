const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const characterRoutes = require('./character/character.route');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const server = http.createServer(app);
server.listen(app.get('port'));

server.on('error', (e) => {
  console.log(`Server throws error : `, e);
});
server.on('listening', () => {
  console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});


app.use('/', characterRoutes);



