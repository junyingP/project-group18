require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;

const ModelClass = require('./model.js');
const Model = new ModelClass();

let p = __dirname + '/public/'

app.use(express.static(p))
app.use(express.json());

app.get('/stores', async (req, res) => {
  const stores = await Model.getStores();
  res.json(stores);
});

app.get('/store', async (req, res) => {
  const {storeid} = req.query

  const store = await Model.getStoreById(storeid)
  res.json(store)
})

app.delete('/store/:storeid', async (req, res) => {
  const { storeid } = req.params; // Extracting store ID from the URL parameter

  try {
    await Model.deleteStoreById(storeid); // Calling the method to delete the store
    res.status(200).json({ message: 'Store deleted successfully' }); // Sending a success response
  } catch (error) {
    console.error('Error deleting store:', error);
    res.status(500).json({ error: 'Internal server error' }); // Sending an error response in case of failure
  }
})

// Example Express route for adding a store
app.post('/stores', async (req, res) => {
  try {
    const { name } = req.body; // Ensure this matches the data structure sent from the client
    await Model.addStore({ name });
    res.status(201).json({ message: 'Store added successfully' });
  } catch (error) {
    console.error('Error adding store:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/store/:storeid', async (req, res) => {
  const { storeid } = req.params; // Extracting store ID from the URL parameter
  try {
    await Model.updateStoreById(storeid, req.body); // req.body contains the updated store data from the client
    res.status(200).json({ message: 'Store updated successfully' });
  } catch (error) {
    console.error('Error updating store:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const server = async () => {
  await Model.connectDatabase();
  await Model.setupDatabase();

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

server();

