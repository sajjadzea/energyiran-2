# OrientDB Integration Guide

This guide explains how to install OrientDB, create the required schema, and expose it through a simple Express API. The provided examples include JWT authentication with role-based access control and a sample React component for visualization.

## 1. Install OrientDB

### Windows
1. Download the latest Community Edition ZIP from [orientdb.org](https://orientdb.org/download/).
2. Extract the archive, e.g. to `C:\orientdb`.
3. Run `C:\orientdb\bin\server.bat` to start the server.

### Linux
1. Download and extract OrientDB:
   ```bash
   wget https://s3.us-east-2.amazonaws.com/orientdb3/releases/3.2.29/orientdb-3.2.29.tar.gz
   tar xzf orientdb-3.2.29.tar.gz
   cd orientdb-3.2.29
   ```
2. Start the server:
   ```bash
   ./bin/server.sh
   ```

> The first launch prompts for a root password which is required for the console.

### Create the `dashboarddb` Database
1. Open the OrientDB console:
   ```bash
   ./bin/console.sh # or console.bat on Windows
   ```
2. Inside the console create the database:
   ```sql
   CREATE DATABASE plocal:../databases/dashboarddb root <rootpassword> "graph";
   CONNECT plocal:../databases/dashboarddb root <rootpassword>;
   ```
Replace `<rootpassword>` with the password you set earlier.

## 2. Define Classes and Seed Data
Run the following console commands after connecting to `dashboarddb`:
```sql
CREATE CLASS Node EXTENDS V;
CREATE PROPERTY Node.name STRING;
CREATE PROPERTY Node.type STRING;
CREATE PROPERTY Node.description STRING;

CREATE CLASS Edge EXTENDS E;
CREATE PROPERTY Edge.relation_type STRING;

CREATE CLASS User EXTENDS V;
CREATE PROPERTY User.username STRING;
CREATE PROPERTY User.password STRING;
CREATE PROPERTY User.role STRING;

INSERT INTO Node SET name="مصرف برق تابستان", type="factor", description="افزایش مصرف برق در تابستان";
INSERT INTO Node SET name="تولید نیروگاه حرارتی", type="source", description="تولید عمده برق کشور توسط نیروگاه‌های حرارتی";
INSERT INTO Node SET name="کمبود بارندگی", type="factor", description="کاهش تولید برق‌آبی به دلیل خشکسالی";
INSERT INTO Node SET name="برق وارداتی", type="import", description="جبران بخشی از کمبود برق از طریق واردات";
INSERT INTO Node SET name="قطع برق صنایع", type="result", description="در نتیجه ناترازی برق، برق صنایع قطع می‌شود";

CREATE EDGE Edge FROM (SELECT FROM Node WHERE name="کمبود بارندگی") TO (SELECT FROM Node WHERE name="تولید نیروگاه حرارتی") SET relation_type="افزایش فشار";
CREATE EDGE Edge FROM (SELECT FROM Node WHERE name="مصرف برق تابستان") TO (SELECT FROM Node WHERE name="کمبود بارندگی") SET relation_type="همزمانی";
CREATE EDGE Edge FROM (SELECT FROM Node WHERE name="تولید نیروگاه حرارتی") TO (SELECT FROM Node WHERE name="برق وارداتی") SET relation_type="نیاز به واردات";
CREATE EDGE Edge FROM (SELECT FROM Node WHERE name="مصرف برق تابستان") TO (SELECT FROM Node WHERE name="قطع برق صنایع") SET relation_type="علت مستقیم";

INSERT INTO User SET username="admin", password="admin123", role="admin";
```

## 3. Express Project Setup
Create a new Node project (or reuse the existing one) and install `orientjs`:
```bash
npm install orientjs jsonwebtoken bcryptjs
```
Establish a database connection:
```javascript
// orientdbClient.js
const OrientDB = require('orientjs');
const server = OrientDB({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: '<rootpassword>',
});

const db = server.use('dashboarddb');
module.exports = db;
```

## 4. API Endpoints
Example Express routes using OrientDB:
```javascript
// server.js (excerpt)
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./orientdbClient');
const app = express();
app.use(express.json());

// Middleware for JWT verification
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    next();
  } catch {
    res.sendStatus(403);
  }
}

// RBAC helper
function authorize(role) {
  return (req, res, next) => {
    if (req.user?.role === role) return next();
    res.sendStatus(403);
  };
}

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.select().from('User').where({ username }).one();
  if (!user || user.password !== password) return res.sendStatus(401);
  const token = jwt.sign({ id: user['@rid'], role: user.role }, process.env.JWT_SECRET || 'secret');
  res.json({ token });
});

app.get('/api/nodes', auth, async (req, res) => {
  const nodes = await db.select().from('Node');
  res.json(nodes);
});

app.post('/api/nodes', auth, authorize('admin'), async (req, res) => {
  const { name, type, description } = req.body;
  const node = await db.insert().into('Node').set({ name, type, description }).one();
  res.json(node);
});

app.get('/api/edges', auth, async (req, res) => {
  const edges = await db.select().from('Edge');
  res.json(edges);
});

app.post('/api/edges', auth, authorize('admin'), async (req, res) => {
  const { fromId, toId, relation_type } = req.body;
  const edge = await db
    .create('EDGE', 'Edge')
    .from(`#${fromId}`)
    .to(`#${toId}`)
    .set({ relation_type })
    .one();
  res.json(edge);
});

app.get('/api/graph', auth, async (req, res) => {
  const nodes = await db.select().from('Node');
  const edges = await db.select().from('Edge');
  res.json({ nodes, edges });
});

app.listen(3000, () => console.log('API ready')); 
```

## 5. React Visualization
Install React Flow (or use Cytoscape.js):
```bash
npm install reactflow
```
Simple component:
```javascript
// GraphView.jsx
import { useEffect, useState } from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

export default function GraphView() {
  const [elements, setElements] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    fetch('/api/graph', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => setElements(data));
  }, []);

  const onNodeClick = (_, node) => {
    alert(node.data.description);
  };

  return (
    <ReactFlow nodes={elements.nodes} edges={elements.edges} onNodeClick={onNodeClick} />
  );
}
```

## 6. Testing and Debugging
- **OrientDB**: use `./bin/console.sh` to run queries and inspect data.
- **Node.js API**: run `npm test` to execute Jest tests; start the server with `node server.js` and monitor logs.
- **Frontend**: run `npm run dev` in the React project for hot reload and inspect network requests via the browser developer tools.

Useful tools:
- `curl` or Postman for hitting the API endpoints.
- OrientDB Studio (browser UI at http://localhost:2480) for visualizing the database.
- Browser devtools for debugging React Flow interactions.

