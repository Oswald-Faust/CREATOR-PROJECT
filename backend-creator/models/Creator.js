const mongoose = require('mongoose');

// Le schéma définit la structure de notre document dans la base de données MongoDB
const creatorSchema = new mongoose.Schema({
  // Mongoose ajoute automatiquement un champ _id, pas besoin de le définir manuellement !
  
  nom: {
    type: String,
    required: true, // Ce champ est obligatoire
    trim: true // Enlève les espaces au début et à la fin pour éviter les erreurs
  },
  prenom: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: false,
    unique: true, // L'email doit être unique dans toute la base de données
    lowercase: true // On convertit toujours l'email en minuscules
  },
  numeroTelephone: {
    type: String,
    required: true
  },
  motDePasse: {
    type: String,
    required: true
    // Note pour les étudiants : Ce mot de passe sera crypté (haché avec bcrypt) avant d'être sauvegardé !
  },
  nicheCreation: {
    type: [String], // Un tableau de chaînes de caractères (ex: ["Mode", "Sport", "Tech"])
    default: []
  },
  photoProfil: {
    type: String, // On stocke généralement l'URL de l'image (ex: lien Cloudinary ou AWS S3)
    default: ""
  },
  photosSupplementaires: {
    type: [String], // Un tableau contenant plusieurs URLs d'images
    default: []
  },
  // Bonne pratique : grouper les informations liées dans un sous-document
  situationMatrimoniale: {
    type: String,
    enum: ['Célibataire', 'En couple', 'Marié(e)', 'Non précisé'], // Restreint les choix possibles
    default: 'Non précisé'
  },
  dateNaissance: {
    type: Date // À partir de la date, on pourra calculer l'âge côté frontend ou backend
  },
  servicesProposes: {
    type: [String], // ex: ["Placement de produit", "Story sponsorisée", "Vidéo dédiée"]
    default: []
  },
  biographie: {
    type: String,
    maxLength: 500 // Limite la taille de la bio
  },
  genre: {
    type: String,
    enum: ['Homme', 'Femme', 'Autre', 'Non précisé'],
    default: 'Non précisé'
  },
  // La relation avec les invitations : un créateur peut avoir plusieurs invitations
  invitationsId: [{
    type: mongoose.Schema.Types.ObjectId,
  }]
}, {
  // Cette option super pratique ajoute automatiquement 'createdAt' et 'updatedAt' à notre document !
  timestamps: true 
});

// On crée et on exporte le modèle pour pouvoir l'utiliser ailleurs dans notre code
module.exports = mongoose.model('Creator', creatorSchema);