const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const db = require("./db.json");

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get("/tarefas", (req, res) => {
  router.render = (req, res) => {
    res.status(500).jsonp({
      error: "error message here",
    });
  };
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

module.exports = server;
