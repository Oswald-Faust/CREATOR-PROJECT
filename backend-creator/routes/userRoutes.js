const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // On importe notre garde du corps !
const Creator = require('../models/Creator');
const Entreprise = require('../models/Entreprise');

// Route protégée : Obtenir le profil de l'utilisateur connecté
// On place "protect" au milieu. Express va d'abord exécuter "protect".
// Si "protect" dit "ok", alors il exécute la fonction suivante.
router.get('/profile', protect, async (req, res) => {
  try {
    // Grâce à notre middleware "protect", on a l'ID de l'utilisateur dans "req.utilisateur.id"
    const { id, role } = req.utilisateur;

    let profil;
    if (role === 'creator') {
      // .select('-motDePasse') permet de ne pas renvoyer le mot de passe au frontend !
      profil = await Creator.findById(id).select('-motDePasse');
    } else {
      profil = await Entreprise.findById(id).select('-motDePasse');
    }

    if (!profil) {
      return res.status(404).json({ message: "Profil introuvable." });
    }

    res.status(200).json(profil);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", erreur: error.message });
  }
});

module.exports = router;
