var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  socketEvents = require('./socket_events'),
  bodyParser = require('body-parser');

require('./api/models/idea');
require('./api/models/concept');
require('./api/models/prompt');
require('./api/models/user');
require('./api/models/project');
require('./api/models/activity');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://creativity_kernal:canonkissX4@ds139951.mlab.com:39951/creativity_kernal',{ useNewUrlParser: true });
//mongoose.connect('mongodb://cknew:canonkissX4@ds131109.mlab.com:31109/cknew',{ useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var routes = require('./api/routes/IdeaRoutes'); //importing route
routes(app); //register the route

routes = require('./api/routes/ProjectRoutes'); //importing route
routes(app);

routes = require('./api/routes/UserRoutes'); //importing route
routes(app);

routes = require('./api/routes/PromptRoutes'); //importing route
routes(app);

routes = require('./api/routes/ConceptRoutes'); //importing route
routes(app);

routes = require('./api/routes/AuthRoutes'); //importing route
routes(app);

routes = require('./api/routes/ActivityRoutes'); //importing route
routes(app);


let server = app.listen(port);

const io = require('socket.io').listen(server);
socketEvents(io);


console.log(' RESTful API server started on: ' + port);
