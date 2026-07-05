const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const connectDB = require('./config/db'); 


dotenv.config();

connectDB();

const app = express();


app.use(cors()); 
app.use(express.json()); 

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.send('Bienvenue sur le Backend de CREATOR ! 🚀');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend en cours d'exécution sur le port ${PORT}`);
});
