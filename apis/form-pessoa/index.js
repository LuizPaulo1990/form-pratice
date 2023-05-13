const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let pessoas = [];

app.get('/pessoas', (req, res) => {
  console.log('AQUI 1')
  res.send(pessoas);
});

app.post('/pessoas', (req, res) => {
  console.log('AQUI 2')

  const { name, email, phone, cpf } = req.body;
  const id = Math.floor(Math.random() * 1000);

  const pessoa = { id, name, email, phone, cpf };
  pessoas.push(pessoa);

  res.send(pessoa);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
