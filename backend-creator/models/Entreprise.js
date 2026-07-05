const mongoose = require('mongoose');

const entrepriseSchema = new mongoose.Schema({
  nomEntreprise: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  numeroTelephone: {
    type: String,
    required: false
  },
  motDePasse: {
    type: String,
    required: true
    // Toujours hasher les mots de passe avant la sauvegarde en base de données !
  },
  adresse: {
    type: String
  },
  servicesEntreprise: {
    type: [String], // Les services que l'entreprise vend (ex: "Cosmétiques", "Vêtements")
    default: []
  },
  dateCreation: {
    type: Date // Date à laquelle l'entreprise a été fondée
  },
  budgetInfluenceurs: {
    type: Number, // Plus facile à manipuler comme un nombre pour faire des calculs/statistiques
    default: 0
  },
  description: {
    type: String,
    maxLength: 1000
  },
  reseauxSociaux: [{
    nomReseau: String,
    url: String
  }],
  // Pour garder une trace des invitations envoyées par cette entreprise
  invitationsEnvoyees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invitation'
  }]
}, {
  // Gère automatiquement 'createdAt' (Date de création du compte) et 'updatedAt'
  timestamps: true
});

module.exports = mongoose.model('Entreprise', entrepriseSchema);
