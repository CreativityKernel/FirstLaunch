const proxy = require("http-proxy-middleware");

// [johncch] We want to preserve Hot Module Reloading while not ejecting
// from [create-react-app](https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-eject)
// To do this, we need a more complex configuration, so that all HTML page
// react requests and the HMR stuff goes to the web server proxy, while all
// other requests goes to the backend. At least until we eject and build.
//
// See where this came from: https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development
const url = "http://localhost:3001";
//const url = "http://18.188.32.120:3001";
const apiUrlFragments = [
  "/projects",
  "/ideas",
  "/prompts",
  "/projects",
  "/auth",
];

module.exports = function(app) {
  apiUrlFragments.forEach(function(el) {
    app.use(proxy(el, { target: url }));
  });
};
