//Ponto de entrada da aplicação
const express = require("express"); // -> mais importante! Permite lidar com rotas, parâmetros e respostas para o cliente
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

//Permite a comunicação, tanto http, quanto web socket, que torna possível a atualização de informações em tempo real
const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(
  "mongodb+srv://semana:semana@cluster0-9qvnw.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

//repassa informações para todas as rotas
app.use((req, res, next) => {
  req.io = io;

  next();
});

// dependência que permite a acessibilidade do backend pelo front end em react, mesmo estando em domínios diferentes!
// entrada de segurança utilizada pelo node por padrão
// Possui configurações para definir domínio que pode acessar e outros parâmetros -> da maneira que está, qualquer aplicação pode acessar
app.use(cors());

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./routes"));

server.listen(3333);
