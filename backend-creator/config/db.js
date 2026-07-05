const mongoose = require('mongoose');

// Fonction pour se connecter à la base de données MongoDB
const connectDB = async () => {
  try {
    // mongoose.connect permet d'établir la connexion avec la base de données
    // L'URL de connexion est stockée dans les variables d'environnement (.env) pour plus de sécurité
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Bien joué : ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erreur de connexion à MongoDB : ${error.message}`);
    // En cas d'erreur grave de connexion, on arrête l'application backend
    process.exit(1); 
  }
};

module.exports = connectDB;
