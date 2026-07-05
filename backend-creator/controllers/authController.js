const bcrypt = require('bcryptjs'); // Pour hacher les mots de passe
const jwt = require('jsonwebtoken'); // Pour créer des tokens de session
const Creator = require('../models/Creator');
const Entreprise = require('../models/Entreprise');

// --- 1. INSCRIPTION (REGISTER) CRÉATEUR ---
exports.registerCreator = async (req, res) => {
  try {
    // On récupère les données envoyées par le frontend (le formulaire d'inscription)
    const { nom, prenom, email, motDePasse } = req.body;

    // Étape 1 : Vérifier si le créateur existe déjà
    const existingCreator = await Creator.findOne({ email });
    if (existingCreator) {
      // 400 = Bad Request (Erreur côté client)
      return res.status(400).json({ message: "Cet email est déjà utilisé par un créateur." });
    }

    // Étape 2 : Hacher le mot de passe pour la sécurité
    // Le "salt" (sel) ajoute de l'aléatoire pour rendre le hachage plus sûr
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(motDePasse, salt);

    // Étape 3 : Créer le nouveau créateur dans la base de données
    const nouveauCreateur = new Creator({
      nom,
      prenom,
      email,
      motDePasse: hashedPassword // On sauvegarde le mot de passe crypté, pas en clair !
    });

    await nouveauCreateur.save(); // On sauvegarde dans MongoDB

    // 201 = Created (Ressource créée avec succès)
    res.status(201).json({ message: "Créateur inscrit avec succès !" });
  } catch (error) {
    // 500 = Internal Server Error (Problème avec notre serveur backend)
    res.status(500).json({ message: "Erreur lors de l'inscription", erreur: error.message });
  }
};

// --- 2. INSCRIPTION (REGISTER) ENTREPRISE ---
exports.registerEntreprise = async (req, res) => {
  try {
    const { nomEntreprise, email, motDePasse } = req.body;

    // Étape 1 : Vérifier si l'entreprise existe déjà
    const existingEntreprise = await Entreprise.findOne({ email });
    if (existingEntreprise) {
      return res.status(400).json({ message: "Cet email est déjà utilisé par une entreprise." });
    }

    // Étape 2 : Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(motDePasse, salt);

    // Étape 3 : Créer la nouvelle entreprise
    const nouvelleEntreprise = new Entreprise({
      nomEntreprise,
      email,
      motDePasse: hashedPassword
    });

    await nouvelleEntreprise.save();

    res.status(201).json({ message: "Entreprise inscrite avec succès !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription", erreur: error.message });
  }
};

// --- 3. CONNEXION (LOGIN) UNIFIÉE ---
// Cette fonction permet à un Créateur OU une Entreprise de se connecter (très pratique pour un Frontend séparé)
exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // On cherche d'abord dans les Créateurs
    let utilisateur = await Creator.findOne({ email });
    let role = 'creator';

    // Si on ne trouve pas de Créateur, on cherche dans les Entreprises
    if (!utilisateur) {
      utilisateur = await Entreprise.findOne({ email });
      role = 'entreprise';
    }

    // Si on ne trouve ni l'un ni l'autre
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé avec cet email." });
    }

    // On compare le mot de passe tapé en clair avec celui haché dans la base de données
    const isMatch = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }

    // Si le mot de passe est bon, on crée un "Token JWT" (Jeton)
    // C'est comme un "badge visiteur" qui permettra à l'utilisateur de prouver qu'il est connecté
    const token = jwt.sign(
      { id: utilisateur._id, role: role }, // Ce qu'on met dans le badge (Payload)
      process.env.JWT_SECRET, // Une signature secrète (dans le fichier .env)
      { expiresIn: '1d' } // Le token expire dans 1 jour (sécurité)
    );

    // On renvoie la réponse au Frontend avec le token et quelques infos de l'utilisateur
    res.status(200).json({
      message: "Connexion réussie !",
      token: token,
      utilisateur: {
        id: utilisateur._id,
        email: utilisateur.email,
        nom: utilisateur.nom || utilisateur.nomEntreprise, // Gère les deux cas
        role: role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion", erreur: error.message });
  }
};
