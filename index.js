require('dotenv').config();
const express = require('express');
const authRouter = require('./src/routes/authRoutes');

const PORT = 5000;

const app = express();
app.use(express.json());
app.use('/', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

