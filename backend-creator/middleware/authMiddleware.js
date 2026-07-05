const jwt = require('jsonwebtoken');

// Un "Middleware" est une fonction qui s'exécute AVANT d'arriver à la route finale
// Il permet de vérifier si l'utilisateur a le droit d'accéder à la ressource
const protect = (req, res, next) => {
  let token;

  // On vérifie si un token a été envoyé dans les "Headers" (en-têtes) de la requête
  // Le standard est de l'envoyer dans "Authorization" avec le format "Bearer LE_TOKEN"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // On extrait juste le token (on enlève le mot "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // On décode le token avec notre clé secrète pour vérifier qu'il est valide
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // On attache les infos décodées (ex: l'id de l'utilisateur) à la requête
      // Comme ça, la route finale saura qui fait la demande !
      req.utilisateur = decoded;

      // On dit à Express de passer à la suite (la route finale)
      next();
    } catch (error) {
      // Si le token est invalide (modifié, expiré...)
      return res.status(401).json({ message: "Non autorisé, token invalide." });
    }
  }

  // Si aucun token n'a été trouvé
  if (!token) {
    res.status(401).json({ message: "Non autorisé, aucun token fourni." });
  }
};

module.exports = { protect };
