require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;

const ModelClass = require('./model.js');
const Model = new ModelClass();

let p = __dirname + '/public/'

app.use(express.static(p))

app.get('/stores', async (req, res) => {
  const stores = await Model.getStores();
  res.json(stores);
});

app.get('/store', async (req, res) => {
  const {storeid} = req.query

  const store = await Model.getStoreById(storeid)
  res.json(store)
})

const server = async () => {
  await Model.connectDatabase();
  await Model.setupDatabase();

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

server();

/*
app.get('/', function (req, res) {
  const { storename } = req.query
  console.log(storename)
  const index = stores.findIndex(store => store.name === storename)
  if (index > -1) {
    res.json(stores[index])
  } else {
    res.send('Store not found!')
  }
})

app.delete('/', function (req, res) {
  const { storename } = req.query
  console.log(storename)
  const index = stores.findIndex(store => store.name === storename)
  if (index > -1) {
    stores.splice(index, 1)
    res.send(`Store found! Deleting store with index: ${index}`)
  } else {
    res.send('Store not found!')
  }
})

app.post('/',
  express.json(), // for parsing application/json body in POST
  (req, res) => {
    const { body } = req
    console.log(body)
    stores.push(body)
    res.send('Store added!')
})

app.listen(3000, () => {
  console.log('Server is running at port 3000')
})
*/
