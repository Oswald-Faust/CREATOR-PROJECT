const express = require('express');
const router = express.Router();

// On importe notre contrôleur qui contient toute la logique (les fonctions) qu'on vient d'écrire
const authController = require('../controllers/authController');

// Définition des routes.
// Côté Frontend, pour appeler ces routes, on fera par exemple :
// axios.post('http://localhost:5000/api/auth/register-creator', data)

// Route pour l'inscription d'un créateur (Méthode POST car on envoie des données sécurisées)
router.post('/register-creator', authController.registerCreator);

// Route pour l'inscription d'une entreprise
router.post('/register-entreprise', authController.registerEntreprise);

// Route pour la connexion (gère les créateurs et les entreprises en même temps)
router.post('/login', authController.login);

module.exports = router;
