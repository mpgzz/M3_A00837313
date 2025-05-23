const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./Back/Controllers/loginCrud');
const loginRoutes = require('./Back/Routes/loginRoutes');
const adminRoutes = require('./Back/Routes/adminRoutes');
const userRoutes = require('./Back/Routes/othersRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

app.use(cors());
app.use(express.json());


connectToDatabase()
  .then(() => {
    console.log("Database connected. Starting server...");
    
    app.use('/api', loginRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/user', userRoutes);

    app.use((req, res) => {
      res.status(404).json({ message: 'Not Found' });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
