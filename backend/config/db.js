const mongoose = require('mongoose');

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURL);
        console.log("Connexion à la base de données MongoDB réussie");

    } catch (error) {

        console.error(`Erreur de connexion à MongoDB : ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectionDB;
