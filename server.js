const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Handle 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});