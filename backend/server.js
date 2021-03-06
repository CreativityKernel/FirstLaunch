var express = require("express"),
  app = express(),
  port = process.env.PORT || 80,
  mongoose = require("mongoose"),
  socketEvents = require("./socket_events"),
  bodyParser = require("body-parser");
const path = require("path");

require("./api/models/prompt");
require("./api/models/idea");
require("./api/models/concept");
require("./api/models/user");
require("./api/models/project");
require("./api/models/activity");

// mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/ck_dev_2", {
//   useNewUrlParser: true
// });

//mongodb+srv://ckdev2:canonkissX4@ck-dev-2.7qbxc.mongodb.net/ck_dev_2?retryWrites=true&w=majority
//mongoose.connect('mongodb://ckdev2:canonkissX4@ds227146.mlab.com:27146/ck_dev_2',{ useNewUrlParser: true });
//mongoose.connect('mongodb://cknew:canonkissX4@ds131109.mlab.com:31109/cknew',{ useNewUrlParser: true });

mongoose.connect(
  "mongodb+srv://ckdev2:canonkissX4@ck-dev-2.7qbxc.mongodb.net/ck_dev_2?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var routes = require("./api/routes/IdeaRoutes"); //importing route
routes(app); //register the route

routes = require("./api/routes/ProjectRoutes"); //importing route
routes(app);

routes = require("./api/routes/UserRoutes"); //importing route
routes(app);

routes = require("./api/routes/PromptRoutes"); //importing route
routes(app);

routes = require("./api/routes/ConceptRoutes"); //importing route
routes(app);

routes = require("./api/routes/AuthRoutes"); //importing route
routes(app);

routes = require("./api/routes/ActivityRoutes"); //importing route
routes(app);

let server = app.listen(port);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

const io = require("socket.io").listen(server);
socketEvents(io);

console.log(" RESTful API server started on: " + port);
