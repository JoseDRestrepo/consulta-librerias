const express = require('express');
const app  = express();

app.use(express.json());

app.use('/register', require('./routes/items.router'));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});