const express = require('express');
const { CosmosClient } = require('@azure/cosmos');

const app = express();
app.use(express.json());

const cosmosEndpoint = 'https://c.hackdavis.postgres.database.azure.com:5432';
const cosmosKey = 'hackdavis123$';
const databaseId = 'citus';
const containerId = 'user_credentials';

const cosmosClient = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
const database = cosmosClient.database(databaseId);
const container = database.container(containerId);

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = { email, password };
    const { resource } = await container.items.create(user);
    res.status(201).json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.email = @email AND c.password = @password',
      parameters: [
        { name: '@email', value: email },
        { name: '@password', value: password },
      ],
    };

    const { resources } = await container.items.query(querySpec).fetchAll();
    if (resources.length > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

const port = 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
